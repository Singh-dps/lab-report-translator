import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth/current-user";
import { getReportsByUserId } from "@/db/queries";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ reports: [] });
    }

    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userReports = await getReportsByUserId(userId);
    return NextResponse.json({ reports: userReports });
  } catch (error: any) {
    console.error("List reports error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
