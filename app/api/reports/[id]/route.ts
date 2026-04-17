import { NextResponse } from "next/server";
import { getReportById } from "@/db/queries";
import { MOCK_REPORT } from "@/mocks/reports";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (!process.env.DATABASE_URL) {
     return NextResponse.json(MOCK_REPORT);
  }

  const report = await getReportById(id);
  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  return NextResponse.json(report);
}
