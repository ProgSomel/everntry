"use server";

import { createConfirmationToken, getEventById } from "@/db/queries";
import { sendConfirmationEmail } from "@/services/email";

export async function submitPayment(_prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const eventId = formData.get("eventId");
  const userId = formData.get("userId");

  if (!name || !email) return { error: "Name and email are required." };
  if (!userId) return { error: "You must be logged in to complete payment." };
  if (!eventId) return { error: "Invalid event." };

  const event = await getEventById(eventId);
  if (!event) return { error: "Event not found." };

  const token = await createConfirmationToken(eventId, userId);

  const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm-going?token=${token}`;

  await sendConfirmationEmail({
    to: email,
    name,
    eventName: event.name,
    confirmUrl,
  });

  return { success: true };
}
