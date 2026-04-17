import type { ContactFormData } from "@/types";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function sendContactMessage(data: ContactFormData): Promise<void> {
  await wait(1200);
  // console.log("[BRL] contact message payload:", data);
  // TODO: substituir por api.post('/contact') na fase de backend
}
