import Stripe from "stripe";
import { rateLimitAPI } from "@/lib/rate-limit";

// Obtener la clave de Stripe desde las variables de entorno
const stripeSecretKey = import.meta.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("STRIPE_SECRET_KEY no está configurada en las variables de entorno");
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export async function GET({ request, url }) {
  // Rate limiting: 100 requests por minuto por IP
  const rateLimit = rateLimitAPI(request, 100, 60 * 1000);
  if (!rateLimit.allowed) {
    return rateLimit.response;
  }
  // Validar que el session_id tenga el formato correcto de Stripe
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return new Response(
      JSON.stringify({ error: "session_id es requerido" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Validar formato básico de session_id de Stripe (cs_test_ o cs_live_)
  if (!/^cs_(test|live)_[a-zA-Z0-9]+$/.test(sessionId)) {
    return new Response(
      JSON.stringify({ error: "Formato de session_id inválido" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!stripe) {
    console.error("Stripe no está inicializado. Verifica STRIPE_SECRET_KEY en .env");
    return new Response(
      JSON.stringify({ 
        error: "Error de configuración del servidor",
        details: "STRIPE_SECRET_KEY no está configurada"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Obtener la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    // Extraer información relevante
    const sessionData = {
      id: session.id,
      customer_email: session.customer_email,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      metadata: session.metadata || {},
      line_items: session.line_items?.data || [],
    };

    return new Response(
      JSON.stringify(sessionData),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          ...rateLimit.headers,
        } 
      }
    );
  } catch (error) {
    console.error("Error al obtener sesión de Stripe:", error);
    // No exponer detalles del error al cliente en producción
    const errorMessage = import.meta.env.PROD
      ? "Error al obtener la información de la sesión"
      : `Error al obtener la información de la sesión: ${error.message || "Error desconocido"}`;
    return new Response(
      JSON.stringify({ 
        error: errorMessage
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
