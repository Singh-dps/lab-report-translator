"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2, TrendingDown, TrendingUp } from "lucide-react";
import type { LabValue } from "@/types/api";
import { getFlagColor, getFlagLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ValueCardProps {
  data: LabValue;
  initiallyExpanded?: boolean;
}

export function ValueCard({ data, initiallyExpanded = false }: ValueCardProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  
  const colors = getFlagColor(data.flag);
  const isConcerning = data.flag === "high" || data.flag === "low" || data.flag === "critical";

  return (
    <div className={`overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200 ${colors.border} ${isExpanded ? "ring-1 ring-border shadow-md" : "hover:border-border/80"}`}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-5 text-left gap-4 bg-transparent cursor-pointer"
      >
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{data.category}</span>
          </div>
          <h3 className="font-medium text-lg text-foreground truncate">{data.name}</h3>
        </div>
        
        <div className="flex items-center gap-6 self-start md:self-auto shrink-0 w-full md:w-auto mt-2 md:mt-0 pt-3 md:pt-0 border-t md:border-0 border-border">
          <div className="flex-1 md:flex-none flex flex-col md:items-end">
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-semibold ${isConcerning ? colors.text : "text-foreground"}`}>
                {data.value}
              </span>
              <span className="text-sm text-muted-foreground">{data.unit}</span>
            </div>
            {(data.referenceRangeLow !== null || data.referenceRangeHigh !== null) && (
              <span className="text-xs text-muted-foreground mt-0.5">
                Range: {data.referenceRangeLow ?? '0'} - {data.referenceRangeHigh ?? '∞'}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
             <Badge variant="outline" className={`capitalize shrink-0 border px-2.5 py-0.5 ${colors.bg} ${colors.text} ${colors.border}`}>
              {getFlagLabel(data.flag)}
            </Badge>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 md:p-5 border-t border-border bg-gray-50/30 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">What does this mean?</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{data.interpretation}</p>
            </div>
            
            {data.questionsForDoctor && data.questionsForDoctor.length > 0 && (
              <div className="p-4 rounded-lg bg-orange-50/50 border border-orange-100/50">
                <h4 className="text-sm font-semibold text-orange-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Ask your doctor
                </h4>
                <ul className="space-y-2 text-sm text-orange-800 list-disc pl-5">
                  {data.questionsForDoctor.map((q, i) => (
                    <li key={i} className="pl-1">{q}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
