import Stripe from "stripe";
import { saveRegistration } from "@/lib/db";
import { rateLimitAPI } from "@/lib/rate-limit";

// Este endpoint debe ser server-rendered
export const prerender = false;

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);
const endpointSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

// Función para enviar correo de confirmación (solo logs por ahora)
async function sendConfirmationEmail(session, purchaseType) {
  const customerEmail = session.customer_email || session.customer_details?.email || null;
  const purchaseName = session.metadata?.name || session.metadata?.title || "Producto/Taller";
  
  console.log("📧 [DEBUG] Preparando envío de correo de confirmación...");
  console.log("📧 [DEBUG] Email del cliente:", customerEmail);
  console.log("📧 [DEBUG] Tipo de compra:", purchaseType);
  console.log("📧 [DEBUG] Nombre:", purchaseName);
  
  if (purchaseType === "taller") {
    console.log("📧 [DEBUG] Contenido del correo: Confirmación de inscripción al taller");
  } else {
    console.log("📧 [DEBUG] Contenido del correo: Confirmación de compra de producto");
  }
  
  console.log("📧 [DEBUG] Nota: Resend no está configurado, solo se muestran logs de debug");
}

export async function POST({ request }) {
  // Validar que el método sea POST
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  // Rate limiting: 200 requests por minuto por IP (webhooks pueden ser frecuentes)
  const rateLimit = rateLimitAPI(request, 200, 60 * 1000);
  if (!rateLimit.allowed) {
    return rateLimit.response;
  }

  // Verificar que el webhook viene de Stripe
  const signature = request.headers.get("stripe-signature");
  
  if (!signature) {
    return new Response(
      JSON.stringify({ error: "Missing stripe-signature header" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!endpointSecret) {
    console.error("STRIPE_WEBHOOK_SECRET no está configurada");
    return new Response(
      JSON.stringify({ error: "Webhook secret not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const body = await request.text();
  let event;

  try {
    // Verificar la firma del webhook
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    // No exponer detalles del error al cliente en producción
    const errorMessage = import.meta.env.PROD 
      ? "Invalid webhook signature" 
      : `Webhook Error: ${err.message}`;
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Manejar el evento checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // Obtener información completa de la sesión
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items", "customer"],
      });

      const purchaseType = session.metadata?.type || null;
      const purchaseName = session.metadata?.name || session.metadata?.title || "Producto/Taller";
      // Soporta tanto 'id' como 'taller_id' en metadata
      const purchaseId = session.metadata?.id || session.metadata?.taller_id || null;

      // Obtener email del cliente de todas las fuentes posibles
      const customerEmail = 
        fullSession.customer_email || 
        session.customer_email || 
        fullSession.customer_details?.email || 
        session.customer_details?.email || 
        null;

      // Obtener nombre del cliente
      const customerName = 
        fullSession.customer_details?.name || 
        session.customer_details?.name || 
        session.metadata?.name || 
        null;

      // Debug: mostrar información recibida
      console.log("📦 Metadata recibida de Stripe:", {
        type: purchaseType,
        name: purchaseName,
        id: purchaseId,
        metadata: session.metadata
      });
      
      console.log("👤 Información del cliente:", {
        email: customerEmail,
        name: customerName,
        email_from_session: session.customer_email,
        email_from_fullSession: fullSession.customer_email,
        customer_details: session.customer_details,
        full_customer_details: fullSession.customer_details
      });

      // Validar que tenemos email (requerido por la base de datos)
      if (!customerEmail) {
        console.error("❌ Error: No se pudo obtener el email del cliente");
        console.error("Session object:", JSON.stringify(session, null, 2));
        return new Response(
          JSON.stringify({ 
            error: "Customer email not found",
            message: "No se pudo obtener el email del cliente de la sesión de Stripe"
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Preparar datos de la inscripción para Supabase
      const registration = {
        session_id: session.id,
        customer_email: customerEmail,
        customer_name: customerName,
        allergies: session.metadata?.allergies || null,
        purchase_type: purchaseType,
        purchase_name: purchaseName,
        purchase_id: purchaseId,
        amount_total: session.amount_total,
        currency: session.currency || 'eur',
        payment_status: session.payment_status,
        paid_at: session.payment_status === "paid" ? new Date().toISOString() : null,
      };

      // Guardar inscripción solo si es un taller
      let saved = false;
      if (purchaseType === "taller") {
        console.log("💾 Intentando guardar inscripción de taller en Supabase...");
        const result = await saveRegistration(registration);
        saved = result !== null;
        if (saved) {
          console.log("✅ Inscripción guardada exitosamente en Supabase");
          console.log("✅ ID de registro:", result?.id);
        } else {
          console.error("❌ Error guardando inscripción en Supabase");
        }
      } else {
        console.log("ℹ️  No es un taller, no se guardará en Supabase. Purchase type:", purchaseType);
      }

      // Enviar correo de confirmación (solo logs por ahora)
      await sendConfirmationEmail(fullSession, purchaseType);

      return new Response(
        JSON.stringify({ 
          received: true,
          saved: saved,
          message: "Webhook processed successfully"
        }),
        { 
          status: 200, 
          headers: { 
            "Content-Type": "application/json",
            ...rateLimit.headers,
          } 
        }
      );
    } catch (error) {
      console.error("Error processing webhook:", error);
      // No exponer detalles del error al cliente en producción
      const errorMessage = import.meta.env.PROD
        ? "Error processing webhook"
        : `Error processing webhook: ${error.message}`;
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // Otros tipos de eventos pueden manejarse aquí
  return new Response(
    JSON.stringify({ received: true, eventType: event.type }),
    { 
      status: 200, 
      headers: { 
        "Content-Type": "application/json",
        ...rateLimit.headers,
      } 
    }
  );
}
