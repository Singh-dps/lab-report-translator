import { ValueFlag } from "./api";

export const REPORT_CATEGORIES = [
  "Complete Blood Count (CBC)",
  "Lipid Profile",
  "Liver Function Test (LFT)",
  "Kidney Function Test (KFT)",
  "Thyroid Profile",
  "Vitamins",
  "Diabetes Profile",
  "Iron Studies",
  "Urine Complete Analysis",
  "Other"
] as const;

export type ReportCategory = typeof REPORT_CATEGORIES[number];
