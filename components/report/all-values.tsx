"use client";

import { useState } from "react";
import { type LabValue } from "@/types/api";
import { ValueCard } from "./value-card";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AllValuesProps {
  values: LabValue[];
}

export function AllValues({ values }: AllValuesProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  if (values.length === 0) return null;

  // Group normal values by category
  const grouped = values.reduce((acc, val) => {
    if (!acc[val.category]) acc[val.category] = [];
    acc[val.category].push(val);
    return acc;
  }, {} as Record<string, LabValue[]>);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4 bg-white border rounded-xl p-1 shadow-sm">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer outline-none">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-1.5 rounded-md text-green-700">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Normal Values</h2>
          <span className="bg-muted text-muted-foreground text-sm font-medium px-2 py-0.5 rounded-full">
            {values.length}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {isOpen ? "Hide" : "Show all"}
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="px-2 pb-4 pt-2 space-y-8 animate-in fade-in duration-200">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider pl-2">{category}</h3>
            <div className="grid gap-2">
              {items.map((val) => (
                <ValueCard key={val.id} data={val} />
              ))}
            </div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
