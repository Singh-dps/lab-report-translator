import Groq from "groq-sdk";
import { extractText, getDocumentProxy } from "unpdf";
import type { LabValue } from "@/types/api";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "mock-key",
});

const VISION_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";
const TEXT_MODEL = "qwen/qwen3-32b";

export type ReportMetadata = {
  labName: string;
  reportDate: string | null;
  patientName: string | null;
};

export type ExtractionResult = {
  metadata: ReportMetadata;
  values: Partial<LabValue>[];
};

async function pdfToText(base64Data: string): Promise<string> {
  const buffer = Buffer.from(base64Data, "base64");
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: true });
  return Array.isArray(text) ? text.join("\n") : text;
}

function stripReasoning(text: string): string {
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}

function stripCodeFence(text: string): string {
  return text.replace(/^```(json)?\s*/i, "").replace(/```\s*$/i, "").trim();
}

function parseExtraction(raw: string): ExtractionResult {
  const cleaned = stripCodeFence(stripReasoning(raw));
  const parsed = JSON.parse(cleaned);
  if (Array.isArray(parsed)) {
    return {
      metadata: { labName: "Unknown Lab", reportDate: null, patientName: null },
      values: parsed,
    };
  }
  return {
    metadata: {
      labName: parsed.metadata?.labName || "Unknown Lab",
      reportDate: parsed.metadata?.reportDate ?? null,
      patientName: parsed.metadata?.patientName ?? null,
    },
    values: Array.isArray(parsed.values) ? parsed.values : [],
  };
}

const EXTRACTION_PROMPT = `
You are a highly analytical medical data extraction system. Extract pathology lab test values AND report metadata from the provided report (Dr Lal PathLabs, Thyrocare, Metropolis, SRL, Redcliffe, or any other Indian lab).

Return ONLY a strict JSON object (no prose, no markdown fences) matching:

{
  "metadata": {
    "labName": string,             // e.g. "Dr Lal PathLabs". Use "Unknown Lab" if not clear.
    "reportDate": string | null,   // ISO date e.g. "2025-11-03". null if not found.
    "patientName": string | null   // null if not found
  },
  "values": [
    {
      "name": string,              // e.g. "Thyroid Stimulating Hormone (TSH)"
      "value": number,
      "unit": string,
      "referenceRangeLow": number | null,
      "referenceRangeHigh": number | null,
      "flag": "low" | "normal" | "high" | "critical" | null,
      "category": "Complete Blood Count (CBC)" | "Lipid Profile" | "Liver Function Test (LFT)" | "Kidney Function Test (KFT)" | "Thyroid Profile" | "Vitamins" | "Diabetes Profile" | "Iron Studies" | "Urine Complete Analysis" | "Other"
    }
  ]
}

Rules:
1. ONLY return the JSON, no prose.
2. "value" MUST be a number. If given as "<0.1", use 0.1. If "not detected", skip the row.
3. If reference range is "10 - 40", low = 10, high = 40.
4. Set "flag" based on value vs reference range.
`;

export async function extractLabData(
  base64Data: string,
  mediaType: "application/pdf" | "image/jpeg" | "image/png"
): Promise<ExtractionResult> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("No Groq API key found");
  }

  const raw = mediaType === "application/pdf"
    ? await extractFromPdfText(base64Data)
    : await extractFromImage(base64Data, mediaType);

  try {
    return parseExtraction(raw);
  } catch (e) {
    console.error("Failed to parse extraction response", e, raw);
    throw new Error("Failed to parse extraction results");
  }
}

async function extractFromPdfText(base64Data: string): Promise<string> {
  const pdfText = await pdfToText(base64Data);
  if (!pdfText.trim()) {
    throw new Error("Could not extract text from PDF — it may be a scanned image. Please upload a JPG/PNG instead.");
  }

  const completion = await groq.chat.completions.create({
    model: TEXT_MODEL,
    temperature: 0,
    reasoning_effort: "none",
    messages: [
      { role: "system", content: EXTRACTION_PROMPT },
      { role: "user", content: `Lab report text:\n\n${pdfText}` },
    ],
  } as any);

  return completion.choices[0].message?.content ?? "";
}

async function extractFromImage(base64Data: string, mediaType: "image/jpeg" | "image/png"): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: VISION_MODEL,
    temperature: 0,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: EXTRACTION_PROMPT },
          { type: "image_url", image_url: { url: `data:${mediaType};base64,${base64Data}` } },
        ],
      },
    ],
  });

  return completion.choices[0].message?.content ?? "";
}
