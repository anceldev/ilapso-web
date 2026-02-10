import { Resend } from "resend";


export const POST = async ({ request }) => {
  const body = await request.text();
  const event = JSON.parse(body);

  if(event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerEmail = session.customer_email;
    const product = session.line_items.data[0].price.product;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const email = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: customerEmail,
      subject: "Your invoice is ready",
      html: `<p>Hola, gracias por inscribirte al taller.Your invoice is attached.</p>`,
    });

    return new Response(JSON.stringify({ message: "Email sent" }), { status: 200 });
  }

  return new Response(JSON.stringify({ message: "Event not supported" }), { status: 200 });
}