import { MOCK_REPORT } from "@/mocks/reports";
import { MOCK_CHAT_MESSAGES } from "@/mocks/chat";
import { ReportHeader } from "@/components/report/report-header";
import { SummaryCard } from "@/components/report/summary-card";
import { ConcerningValues } from "@/components/report/concerning-values";
import { AllValues } from "@/components/report/all-values";
import { ChatDrawer } from "@/components/chat/chat-drawer";

export default async function ReportPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/reports/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error("Failed to fetch report");
  }
  const report: import("@/types/api").Report = await res.json();

  const chatRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/reports/${id}/chat`, { cache: 'no-store' });
  const chatData = await chatRes.json();
  const chatMessages = chatData.messages || [];

  const concerningValues = report.values.filter(v => v.flag === "high" || v.flag === "low" || v.flag === "critical");
  const normalValues = report.values.filter(v => v.flag === "normal" || !v.flag);

  return (
    <div className="relative min-h-screen">
      {/* Main content area leaves room for desktop sidebar */}
      <div className="pb-24 md:pb-8 md:pr-[400px] lg:pr-[450px]">
        <ReportHeader 
          reportId={report.id}
          patientName={report.patientName} 
          reportDate={report.reportDate} 
          labName={report.labName} 
        />
        
        <div className="space-y-8">
          <SummaryCard summaryText={report.summaryText} />
          <ConcerningValues values={concerningValues} />
          <AllValues values={normalValues} />
        </div>
      </div>

      <ChatDrawer messages={chatMessages} reportId={report.id} />
    </div>
  );
}
