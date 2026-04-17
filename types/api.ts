export type ValueFlag = "low" | "normal" | "high" | "critical";

export type LabValue = {
  id: string;
  name: string;              // "Thyroid Stimulating Hormone (TSH)"
  value: number;
  unit: string;              // "mIU/L"
  referenceRangeLow: number | null;
  referenceRangeHigh: number | null;
  flag: ValueFlag | null;
  category: string;          // "Thyroid", "Lipid Profile", "CBC"...
  interpretation: string;    // plain-language, per value
  questionsForDoctor: string[];
};

export type Report = {
  id: string;
  labName: string;
  reportDate: string;        // ISO date
  patientName: string | null;
  summaryText: string;       // 3-sentence overview
  values: LabValue[];
  createdAt: string;         // ISO datetime
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

// Endpoint shapes
export type UploadResponse = { reportId: string };
export type GetReportResponse = Report;
export type GetChatResponse = { messages: ChatMessage[] };
export type PostChatRequest = { content: string };
export type PostChatResponse = { message: ChatMessage };
