import { FileDown, Calendar, User } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

interface ReportHeaderProps {
  reportId: string;
  patientName: string | null;
  reportDate: string;
  labName: string;
}

export function ReportHeader({ reportId, patientName, reportDate, labName }: ReportHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium uppercase tracking-wider">{formatDate(reportDate)}</span>
          <span className="text-sm border-l border-border pl-2 ml-1">{labName}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User className="w-5 h-5" />
          </div>
          <h1 className="font-heading text-4xl text-foreground my-0">
            {patientName || "Your Report"}
          </h1>
        </div>
      </div>
      <a href={`/api/reports/${reportId}/pdf`} target="_blank" className={cn(buttonVariants({ size: "lg" }), "shrink-0 gap-2 font-medium")}>
        <FileDown className="w-4 h-4" />
        Generate doctor summary
      </a>
    </div>
  );
}
