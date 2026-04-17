"use client";

import { useState } from "react";
import { FileText, UploadCloud, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProcessingScreen } from "./processing-screen";
import { useRouter } from "next/navigation";

export function UploadZone() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleValidFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (f: File) => {
    setError(null);
    if (!f.type.includes("pdf") && !f.type.includes("image")) {
      setError("Please upload a PDF, JPG, or PNG file.");
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      setError("File exceeds the 20MB limit.");
      return;
    }
    setFile(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await fetch("/api/reports", {
        method: "POST",
        body: formData
      });
      
      if (!res.ok) {
        throw new Error(await res.text() || "Failed to process report");
      }
      
      const data = await res.json();
      router.push(`/reports/${data.reportId}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred");
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return <ProcessingScreen />;
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8 space-y-6">
      {!file ? (
        <label 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-12 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group h-[280px]"
        >
          <UploadCloud className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
          <p className="font-medium text-foreground">Click or drag a file here</p>
          <p className="text-sm text-muted-foreground mt-1 text-center">We accept PDF, JPG, and PNG files up to 20MB.</p>
          <input type="file" className="hidden" accept=".pdf,image/png,image/jpeg,image/jpg" onChange={handleValidFile} />
        </label>
      ) : (
        <div className="border border-border rounded-xl p-6 bg-gray-50/50 h-[280px] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-foreground truncate max-w-[200px]">{file.name}</p>
                <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button onClick={() => setFile(null)} className="p-1 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <Button onClick={handleUpload} size="lg" className="w-full" disabled={isProcessing}>
            Analyze this report
          </Button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Your report stays private. We don't share it with anyone.
      </p>
    </div>
  );
}
