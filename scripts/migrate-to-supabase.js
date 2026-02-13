#!/usr/bin/env node

/**
 * Script de migración de datos desde registrations.json a Supabase
 * 
 * Uso:
 *   node scripts/migrate-to-supabase.js
 * 
 * Requisitos:
 *   - Archivo data/registrations.json debe existir (si tienes datos antiguos)
 *   - Variables de entorno SUPABASE_* configuradas
 */

import { readFile, existsSync } from 'fs';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Cargar variables de entorno
config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY deben estar configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Función para desencriptar (si los datos estaban encriptados)
function decrypt(text, encryptionKey) {
  if (!encryptionKey || encryptionKey.length < 32) {
    return text; // No está encriptado
  }
  try {
    const parts = text.split(':');
    if (parts.length !== 2) {
      return text; // No está encriptado
    }
    const crypto = require('crypto');
    const key = Buffer.from(encryptionKey.slice(0, 32).padEnd(32, '0'), 'utf8');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.warn('Error desencriptando, asumiendo que no está encriptado:', err.message);
    return text;
  }
}

async function migrate() {
  const DATA_DIR = join(process.cwd(), 'data');
  const REGISTRATIONS_FILE = join(DATA_DIR, 'registrations.json');

  // Verificar si existe el archivo JSON
  if (!existsSync(REGISTRATIONS_FILE)) {
    console.log('ℹ️  No se encontró data/registrations.json');
    console.log('   No hay datos para migrar. El sistema usará Supabase desde ahora.');
    return;
  }

  console.log('📖 Leyendo datos de registrations.json...');
  
  let jsonData;
  try {
    const fileContent = readFile(REGISTRATIONS_FILE, 'utf-8');
    const encryptionKey = process.env.DATA_ENCRYPTION_KEY;
    const decryptedContent = decrypt(fileContent, encryptionKey);
    jsonData = JSON.parse(decryptedContent);
  } catch (error) {
    console.error('❌ Error leyendo/parseando el archivo:', error.message);
    process.exit(1);
  }

  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    console.log('ℹ️  No hay datos para migrar (archivo vacío o sin formato válido)');
    return;
  }

  console.log(`📊 Encontradas ${jsonData.length} inscripciones para migrar`);

  // Convertir formato antiguo al nuevo formato de Supabase
  const registrations = jsonData.map((reg) => {
    return {
      session_id: reg.sessionId || reg.session_id,
      customer_email: reg.customerEmail || reg.customer_email,
      customer_name: reg.customerName || reg.customer_name || null,
      allergies: reg.allergies || null,
      purchase_type: reg.purchaseType || reg.purchase_type || null,
      purchase_name: reg.purchaseName || reg.purchase_name,
      purchase_id: reg.purchaseId || reg.purchase_id || null,
      amount_total: reg.amountTotal || reg.amount_total || null,
      currency: reg.currency || 'eur',
      payment_status: reg.paymentStatus || reg.payment_status || 'pending',
      paid_at: reg.paidAt || reg.paid_at || null,
      created_at: reg.createdAt || reg.created_at || new Date().toISOString(),
    };
  });

  console.log('💾 Migrando datos a Supabase...');

  // Insertar en lotes de 100 para evitar problemas de tamaño
  const batchSize = 100;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < registrations.length; i += batchSize) {
    const batch = registrations.slice(i, i + batchSize);
    
    try {
      const { data, error } = await supabase
        .from('registrations')
        .insert(batch)
        .select();

      if (error) {
        // Si es error de duplicado, intentar insertar uno por uno
        if (error.code === '23505') { // Unique violation
          console.log(`⚠️  Algunos registros ya existen, insertando individualmente...`);
          for (const reg of batch) {
            try {
              const { error: singleError } = await supabase
                .from('registrations')
                .insert(reg)
                .select();
              
              if (!singleError) {
                successCount++;
              } else if (singleError.code !== '23505') {
                console.error(`❌ Error insertando registro ${reg.session_id}:`, singleError.message);
                errorCount++;
              } else {
                console.log(`ℹ️  Registro ${reg.session_id} ya existe, omitiendo`);
              }
            } catch (err) {
              console.error(`❌ Error insertando registro ${reg.session_id}:`, err.message);
              errorCount++;
            }
          }
        } else {
          console.error(`❌ Error insertando lote ${i / batchSize + 1}:`, error.message);
          errorCount += batch.length;
        }
      } else {
        successCount += batch.length;
        console.log(`✅ Lote ${i / batchSize + 1} migrado (${batch.length} registros)`);
      }
    } catch (error) {
      console.error(`❌ Error inesperado en lote ${i / batchSize + 1}:`, error.message);
      errorCount += batch.length;
    }
  }

  console.log('\n📈 Resumen de migración:');
  console.log(`   ✅ Migradas exitosamente: ${successCount}`);
  console.log(`   ❌ Errores: ${errorCount}`);
  console.log(`   📦 Total procesadas: ${registrations.length}`);

  if (successCount > 0) {
    console.log('\n✅ Migración completada!');
    console.log('💡 Puedes hacer backup del archivo JSON y luego eliminarlo si lo deseas.');
  } else {
    console.log('\n⚠️  No se migraron datos. Verifica los errores arriba.');
  }
}

// Ejecutar migración
migrate().catch((error) => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
