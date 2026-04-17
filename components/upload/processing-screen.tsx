"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const STAGES = [
  "Reading your report...",
  "Identifying each value...",
  "Checking reference ranges...",
  "Preparing your explanation..."
];

export function ProcessingScreen() {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    // We roughly want 4 stages across ~10 seconds = 2.5s per stage
    const interval = setInterval(() => {
      setStageIndex((prev) => Math.min(prev + 1, STAGES.length - 1));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-8 bg-white border rounded-2xl shadow-sm h-[280px]">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        <Loader2 className="w-12 h-12 text-primary animate-spin relative" />
      </div>
      
      <div className="space-y-4 text-center w-full max-w-[240px]">
        <div className="h-6 flex items-center justify-center overflow-hidden relative">
          {STAGES.map((message, i) => (
            <p 
              key={i}
              className={`absolute font-medium text-foreground transition-all duration-500 will-change-transform
                ${i === stageIndex ? "opacity-100 translate-y-0" : 
                  i < stageIndex ? "opacity-0 -translate-y-4" : "opacity-0 translate-y-4"}
              `}
            >
              {message}
            </p>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${((stageIndex + 1) / STAGES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
