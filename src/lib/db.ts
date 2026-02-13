import { createClient } from '@supabase/supabase-js';
import { supabaseAuth } from './auth';

// Obtener credenciales de Supabase desde variables de entorno
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY; // Para operaciones del servidor (webhook)

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("SUPABASE_URL o SUPABASE_ANON_KEY no están configuradas");
}

// Cliente para operaciones del servidor (webhook) - con permisos completos
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

// Cliente para operaciones autenticadas (panel admin) - usa el cliente de auth
export const supabase = supabaseAuth;

// Tipos TypeScript para las inscripciones
export interface Registration {
  id?: number;
  session_id: string;
  customer_email: string;
  customer_name: string | null;
  allergies: string | null;
  purchase_type: string | null;
  purchase_name: string;
  purchase_id: string | null;
  amount_total: number | null;
  currency: string | null;
  payment_status: string;
  paid_at: string | null;
  created_at?: string;
}

// Función para guardar una inscripción
export async function saveRegistration(registration: Omit<Registration, 'id' | 'created_at'>): Promise<Registration | null> {
  if (!supabaseAdmin) {
    console.error("❌ Supabase no está configurado (supabaseAdmin es null)");
    console.error("SUPABASE_URL:", import.meta.env.SUPABASE_URL);
    console.error("SUPABASE_SERVICE_ROLE_KEY:", import.meta.env.SUPABASE_SERVICE_ROLE_KEY ? "Configurada" : "NO configurada");
    return null;
  }

  console.log("📝 Datos a insertar en Supabase:", {
    session_id: registration.session_id,
    customer_email: registration.customer_email,
    purchase_type: registration.purchase_type,
    purchase_name: registration.purchase_name,
  });

  try {
    const { data, error } = await supabaseAdmin
      .from('registrations')
      .insert({
        session_id: registration.session_id,
        customer_email: registration.customer_email,
        customer_name: registration.customer_name,
        allergies: registration.allergies,
        purchase_type: registration.purchase_type,
        purchase_name: registration.purchase_name,
        purchase_id: registration.purchase_id,
        amount_total: registration.amount_total,
        currency: registration.currency,
        payment_status: registration.payment_status,
        paid_at: registration.paid_at,
      })
      .select()
      .single();

    if (error) {
      console.error("❌ Error guardando inscripción en Supabase:", error);
      console.error("Código de error:", error.code);
      console.error("Mensaje:", error.message);
      console.error("Detalles:", error.details);
      return null;
    }

    console.log("✅ Inscripción guardada exitosamente:", data);
    return data;
  } catch (error) {
    console.error("❌ Error inesperado guardando inscripción:", error);
    if (error instanceof Error) {
      console.error("Mensaje:", error.message);
      console.error("Stack:", error.stack);
    }
    return null;
  }
}

// Función para obtener todas las inscripciones (requiere autenticación)
export async function getRegistrations(): Promise<Registration[]> {
  if (!supabase) {
    console.error("Supabase no está configurado");
    return [];
  }

  try {
    // Verificar que el usuario esté autenticado
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.error("Usuario no autenticado");
      return [];
    }

    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error obteniendo inscripciones:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error inesperado obteniendo inscripciones:", error);
    return [];
  }
}

// Función para obtener inscripciones por taller (requiere autenticación)
export async function getRegistrationsByTaller(purchaseId?: string): Promise<Registration[]> {
  if (!supabase) {
    console.error("Supabase no está configurado");
    return [];
  }

  try {
    // Verificar que el usuario esté autenticado
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.error("Usuario no autenticado");
      return [];
    }

    let query = supabase
      .from('registrations')
      .select('*')
      .eq('purchase_type', 'taller')
      .order('created_at', { ascending: false });

    if (purchaseId) {
      query = query.eq('purchase_id', purchaseId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error obteniendo inscripciones por taller:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error inesperado obteniendo inscripciones por taller:", error);
    return [];
  }
}

// Función para verificar conexión a la base de datos (solo para webhook/admin)
export async function testConnection(): Promise<boolean> {
  if (!supabaseAdmin) {
    return false;
  }

  try {
    const { error } = await supabaseAdmin.from('registrations').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
}
