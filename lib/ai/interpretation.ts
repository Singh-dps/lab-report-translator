import Groq from "groq-sdk";
import type { LabValue } from "@/types/api";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "mock-key",
});

const TEXT_MODEL = "qwen/qwen3-32b";

const INTERPRETATION_PROMPT = `
You are an empathetic, culturally aware medical translator for Indian patients. Your goal is to explain lab results.
You will receive a JSON array of extracted lab values.

Task:
Return a strict JSON object with this shape:
{
  "summaryText": "A 3-sentence plain language overview of the report.",
  "interpretations": {
    "Test Name from Input": {
      "interpretation": "Plain language meaning of this specific reading. For concerning values, explain why it matters. Use Indian dietary/lifestyle refs when relevant.",
      "questionsForDoctor": ["Question 1", "Question 2"]
    }
  }
}

Rules:
1. ONLY return the JSON object, no prose, no markdown blocks.
2. DO NOT DIAGNOSE. Always defer to the doctor.
3. Do not recommend medications or dosages.
4. For normal values, the interpretation can be short (1 sentence) and questions array empty.
5. For abnormal (high/low) values, provide deeper context and 1-2 questions for the doctor.
`;

function stripReasoning(text: string): string {
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}

function stripCodeFence(text: string): string {
  return text.replace(/^```(json)?\s*/i, "").replace(/```\s*$/i, "").trim();
}

export async function generateInterpretations(values: Partial<LabValue>[]) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("No Groq API key found");
  }

  const response = await groq.chat.completions.create({
    model: TEXT_MODEL,
    temperature: 0.2,
    reasoning_effort: "none",
    messages: [
      { role: "system", content: INTERPRETATION_PROMPT },
      { role: "user", content: JSON.stringify(values) },
    ],
  } as any);

  try {
    const rawText = response.choices[0].message?.content ?? "";
    const cleaned = stripCodeFence(stripReasoning(rawText));
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse interpretation response", e);
    throw new Error("Failed to parse interpretation results");
  }
}
