#!/bin/bash

# Script para iniciar el servidor de desarrollo con ngrok
# Uso: ./scripts/start-dev-with-ngrok.sh

echo "🚀 Iniciando servidor de desarrollo..."
echo ""
echo "📝 Pasos siguientes:"
echo "1. Cuando el servidor esté corriendo, abre otra terminal"
echo "2. Ejecuta: ngrok http 4321"
echo "3. Copia la URL HTTPS que ngrok te da"
echo "4. Actualiza la URL de éxito en tus Stripe Payment Links"
echo ""
echo "⏳ Iniciando servidor en http://localhost:4321..."
echo ""

pnpm dev
