import { type LabValue } from "@/types/api";
import { ValueCard } from "./value-card";
import { AlertCircle } from "lucide-react";

interface ConcerningValuesProps {
  values: LabValue[];
}

export function ConcerningValues({ values }: ConcerningValuesProps) {
  if (values.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <div className="bg-amber-100 p-1.5 rounded-md text-amber-700">
          <AlertCircle className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Needs Attention</h2>
        <span className="bg-muted text-muted-foreground text-sm font-medium px-2 py-0.5 rounded-full ml-2">
          {values.length}
        </span>
      </div>
      
      <div className="grid gap-3">
        {values.map((v) => (
          <ValueCard key={v.id} data={v} initiallyExpanded={true} />
        ))}
      </div>
    </div>
  );
}
