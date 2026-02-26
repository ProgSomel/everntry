import { confirmGoing } from "@/db/queries";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) redirect("/");

  const result = await confirmGoing(token);

  if (!result.success) redirect("/?error=invalid-token");

  revalidatePath(`/details/${result.eventId}`);
  revalidatePath("/");

  redirect(`/details/${result.eventId}?confirmed=true`);
}
