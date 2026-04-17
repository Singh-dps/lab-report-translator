import Groq from "groq-sdk";
import type { Report, ChatMessage } from "@/types/api";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "mock-key",
});

export async function handleChatMessage(report: Report, messageHistory: ChatMessage[], newContent: string) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("No Groq API key found");
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

  const response = await groq.chat.completions.create({
    model: "qwen/qwen3-32b",
    messages,
    max_tokens: 1000,
    reasoning_effort: "none",
  } as any);

  const raw = response.choices[0].message?.content || "I'm sorry, I couldn't generate a response.";
  return raw.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}
