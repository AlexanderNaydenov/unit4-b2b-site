import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Exit draft / live preview (clears the draft mode cookie). */
export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
