import OpenAI from "openai";
import type { Report, ChatMessage } from "@/types/api";

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY || "mock-key",
  baseURL: "https://api.x.ai/v1",
});

export async function handleChatMessage(report: Report, messageHistory: ChatMessage[], newContent: string) {
  if (!process.env.XAI_API_KEY) {
    throw new Error("No XAI API key found");
  }

  const systemPrompt = `
You are Nidan's AI assistant, helping an Indian user understand their lab report.
You have access to their latest report data.

Report Summary:
${report.summaryText}

Detailed Values:
${JSON.stringify(report.values.map(v => ({ name: v.name, value: v.value, unit: v.unit, flag: v.flag, meaning: v.interpretation })), null, 2)}

Rules:
1. Answer questions clearly and empathetically, using the Indian context (e.g. referencing typical Indian diet if discussing B12/Iron/Diabetes).
2. Keep answers concise but informative.
3. DO NOT DIAGNOSE or recommend specific medications.
4. Advise 'discussing with a doctor' for clinical actions.
  `;

  const messages: any[] = [
    { role: "system", content: systemPrompt }
  ];

  messageHistory.forEach(m => {
    messages.push({ role: m.role, content: m.content });
  });

  messages.push({ role: "user", content: newContent });

  const response = await openai.chat.completions.create({
    model: "grok-2-latest",
    messages,
    max_tokens: 1000,
  });

  return response.choices[0].message?.content || "I'm sorry, I couldn't generate a response.";
}
