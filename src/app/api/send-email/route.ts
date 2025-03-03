import { sendEmail } from "@/components/utils/nodemailer";

export async function POST(request:any) {
  const { to, subject, text } = await request.json();

  try {
    await sendEmail(to, subject, text);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
    });
  }
}