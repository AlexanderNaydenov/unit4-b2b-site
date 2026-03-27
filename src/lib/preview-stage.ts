import { draftMode } from "next/headers";

export async function getContentStage(): Promise<"DRAFT" | "PUBLISHED"> {
  const { isEnabled } = await draftMode();
  return isEnabled ? "DRAFT" : "PUBLISHED";
}
