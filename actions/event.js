"use server";

import { toggleInterested, toggleGoing } from "@/db/queries";
import { revalidatePath } from "next/cache";

export async function toggleInterestedAction(eventId, userId) {
  await toggleInterested(eventId, userId);
  revalidatePath(`/details/${eventId}`);
  revalidatePath("/");
}

export async function toggleGoingAction(eventId, userId) {
  await toggleGoing(eventId, userId);
  revalidatePath(`/details/${eventId}`);
  revalidatePath("/");
}
