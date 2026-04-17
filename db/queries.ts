import { db } from "./index";
import { reports, values, messages } from "./schema";
import { eq, asc, desc } from "drizzle-orm";
import type { Report, LabValue, ChatMessage } from "@/types/api";

type InsertReport = typeof reports.$inferInsert;
type InsertValue = typeof values.$inferInsert;
type InsertMessage = typeof messages.$inferInsert;

export async function createReportWithValues(reportData: InsertReport, valuesData: Omit<InsertValue, "reportId">[]) {
  // neon-http does not support transactions, so inserts run sequentially.
  const [newReport] = await db.insert(reports).values(reportData).returning();

  if (valuesData.length > 0) {
    const valuesToInsert = valuesData.map(v => ({ ...v, reportId: newReport.id }));
    await db.insert(values).values(valuesToInsert);
  }

  return newReport.id;
}

export async function getReportsByUserId(userId: string): Promise<Omit<Report, 'values'>[]> {
  const rs = await db.select().from(reports).where(eq(reports.userId, userId)).orderBy(desc(reports.createdAt));
  return rs.map(r => ({
    id: r.id,
    labName: r.labName,
    reportDate: r.reportDate.toISOString(),
    patientName: r.patientName,
    summaryText: r.summaryText,
    createdAt: r.createdAt.toISOString()
  }));
}

export async function getReportById(id: string): Promise<Report | null> {
  const rs = await db.select().from(reports).where(eq(reports.id, id));
  if (!rs.length) return null;
  
  const reportRow = rs[0];
  const vs = await db.select().from(values).where(eq(values.reportId, id));
  
  const mappedValues: LabValue[] = vs.map(v => ({
    id: v.id,
    name: v.name,
    value: Number(v.value),
    unit: v.unit,
    referenceRangeLow: v.referenceRangeLow !== null ? Number(v.referenceRangeLow) : null,
    referenceRangeHigh: v.referenceRangeHigh !== null ? Number(v.referenceRangeHigh) : null,
    flag: v.flag as any,
    category: v.category,
    interpretation: v.interpretation,
    questionsForDoctor: (v.questionsForDoctor as string[]) || []
  }));
  
  return {
    id: reportRow.id,
    labName: reportRow.labName,
    reportDate: reportRow.reportDate.toISOString(),
    patientName: reportRow.patientName,
    summaryText: reportRow.summaryText,
    createdAt: reportRow.createdAt.toISOString(),
    values: mappedValues
  };
}

export async function createMessage(msg: Omit<InsertMessage, "id" | "createdAt">) {
  const [created] = await db.insert(messages).values(msg).returning();
  return {
    id: created.id,
    role: created.role as "user" | "assistant",
    content: created.content,
    createdAt: created.createdAt.toISOString()
  } satisfies ChatMessage;
}

export async function getMessagesByReportId(reportId: string): Promise<ChatMessage[]> {
  const msgs = await db.select().from(messages).where(eq(messages.reportId, reportId)).orderBy(asc(messages.createdAt));
  return msgs.map(m => ({
    id: m.id,
    role: m.role as "user" | "assistant",
    content: m.content,
    createdAt: m.createdAt.toISOString()
  }));
}
