import OpenAI from "openai";
import type { LabValue } from "@/types/api";

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY || "mock-key",
  baseURL: "https://api.x.ai/v1",
});

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

export async function generateInterpretations(values: Partial<LabValue>[]) {
  if (!process.env.XAI_API_KEY) {
    throw new Error("No XAI API key found");
  }

  const response = await openai.chat.completions.create({
    model: "grok-2-latest",
    temperature: 0.2, // slight creativity for natural language
    messages: [
      {
        role: "system",
        content: INTERPRETATION_PROMPT,
      },
      {
        role: "user",
        content: JSON.stringify(values),
      },
    ],
  });

  try {
    const rawText = response.choices[0].message?.content?.trim() || "";
    const jsonStr = rawText.replace(/^```(json)?\n?/i, "").replace(/\n?```$/i, "");
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse Grok interpretation response", e);
    throw new Error("Failed to parse interpretation results");
  }
}
