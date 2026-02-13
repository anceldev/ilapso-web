// import { Resend } from "resend";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const resend = new Resend(import.meta.env.RESEND_API_KEY);
// const endpointSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

// export const POST = async ({ request }) => {
//   const signature = request.headers.get("stripe-signature");
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
//   } catch (err) {
//     return new Response(`Webhook Error: ${err.message}`, { status: 400 });
//   }
//   // Si llegamos aquí, el evento es auténtico
//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;
    
//     // Aquí disparas tu lógica de Resend
//     // await enviarCorreoConfirmacion(session);

//     const customerEmail = session.customer_email;
//     const product = session.line_items.data[0].price.product;

//     const resend = new Resend(process.env.RESEND_API_KEY);
//     const email = await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: customerEmail,
//       subject: "Your invoice is ready",
//       html: `<p>Hola, gracias por inscribirte al taller.Your invoice is attached.</p>`,
//     });

//     return new Response(JSON.stringify({ message: "Email sent" }), { status: 200 });
//   }

//   const body = await request.text();
//   // const event = JSON.parse(body);

//   // if(event.type === "checkout.session.completed") {
//   //   const session = event.data.object;
//   //   const customerEmail = session.customer_email;
//   //   const product = session.line_items.data[0].price.product;

//   //   const resend = new Resend(process.env.RESEND_API_KEY);
//   //   const email = await resend.emails.send({
//   //     from: "onboarding@resend.dev",
//   //     to: customerEmail,
//   //     subject: "Your invoice is ready",
//   //     html: `<p>Hola, gracias por inscribirte al taller.Your invoice is attached.</p>`,
//   //   });

//   //   return new Response(JSON.stringify({ message: "Email sent" }), { status: 200 });
//   // }

//   return new Response(JSON.stringify({ message: "Event not supported" }), { status: 200 });
// }