import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail({ to, name, eventName, confirmUrl }) {
  await resend.emails.send({
    from: "Eventry <onboarding@resend.dev>",
    to,
    subject: `Confirm your attendance for ${eventName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2>Hey ${name},</h2>
        <p>You submitted payment for <strong>${eventName}</strong>.</p>
        <p>Click the button below to confirm your attendance:</p>
        <a href="${confirmUrl}"
          style="display:inline-block; background:#4f46e5; color:white; padding:12px 24px;
                 border-radius:6px; text-decoration:none; font-weight:bold; margin: 16px 0;">
          Confirm Attendance
        </a>
        <p style="color:#888; font-size:12px;">This link expires in 24 hours.</p>
      </div>
    `,
  });
}
