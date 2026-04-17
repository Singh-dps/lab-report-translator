import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface SummaryCardProps {
  summaryText: string;
}

export function SummaryCard({ summaryText }: SummaryCardProps) {
  return (
    <Card className="border-primary/20 shadow-sm overflow-hidden bg-gradient-to-br from-white to-primary/5">
      <div className="h-1 bg-primary w-full" />
      <CardContent className="p-6 md:p-8">
        <div className="flex gap-4">
          <div className="mt-1 shrink-0 bg-white p-2 rounded-full shadow-sm border border-primary/10">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-lg text-foreground">AI Interpretation</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {summaryText}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
