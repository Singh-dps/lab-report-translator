import OpenAI from "openai";
import type { LabValue } from "@/types/api";

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY || "mock-key",
  baseURL: "https://api.x.ai/v1",
});

const EXTRACTION_PROMPT = `
You are a highly analytical medical data extraction system. Your task is to extract pathology lab test values from the provided report (could be Dr Lal PathLabs, Thyrocare, Metropolis, etc.) and return a strict JSON array.

Return an array of objects matching this TS interface:
export type ValueFlag = "low" | "normal" | "high" | "critical";
export type LabValue = {
  name: string; // e.g. "Thyroid Stimulating Hormone (TSH)"
  value: number; // numeric value
  unit: string;
  referenceRangeLow: number | null;
  referenceRangeHigh: number | null;
  flag: ValueFlag | null; // determine based on value vs reference range
  category: string; // one of: "Complete Blood Count (CBC)", "Lipid Profile", "Liver Function Test (LFT)", "Kidney Function Test (KFT)", "Thyroid Profile", "Vitamins", "Diabetes Profile", "Iron Studies", "Urine Complete Analysis", "Other"
};

Rules:
1. ONLY return the JSON array, no prose, no markdown formatting (no \`\`\`json).
2. Ensure values are numbers. If a value is "<0.1", put 0.1 and flag accordingly.
3. Classify into the closest category.
4. If a reference range is like "10 - 40", low = 10, high = 40.

Extract the data from the attached document.
`;

export async function extractLabData(base64Data: string, mediaType: "application/pdf" | "image/jpeg" | "image/png"): Promise<Partial<LabValue>[]> {
  if (!process.env.XAI_API_KEY) {
    throw new Error("No XAI API key found");
  }

  const content: any[] = [
    { type: "text", text: EXTRACTION_PROMPT }
  ];

  if (mediaType === "application/pdf") {
    content.push({
      type: "image_url",
      image_url: {
        url: `data:application/pdf;base64,${base64Data}`
      }
    });
  } else {
    content.push({
      type: "image_url",
      image_url: {
        url: `data:${mediaType};base64,${base64Data}`
      }
    });
  }

  const response = await openai.chat.completions.create({
    model: "grok-vision-beta",
    temperature: 0,
    messages: [
      {
        role: "user",
        content,
      },
    ],
  });

  try {
    const rawText = response.choices[0].message?.content?.trim() || "";
    // In case Grok wrapped it in markdown
    const jsonStr = rawText.replace(/^```(json)?\n?/i, "").replace(/\n?```$/i, "");
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse Grok extraction response", e);
    throw new Error("Failed to parse extraction results");
  }
}
