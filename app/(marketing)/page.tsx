import { UploadZone } from "@/components/upload/upload-zone";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12">
      <div className="space-y-6 max-w-3xl">
        <h1 className="font-heading text-5xl md:text-7xl tracking-tight text-foreground">
          Upload your lab report. Understand it in a minute.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Nidan reads your blood work from Dr Lal, Thyrocare, Metropolis, and every major Indian lab — and explains what each value means in plain language. Plus a one-page summary you can bring to your next doctor's appointment.
        </p>
      </div>

      <UploadZone />

      <div className="pt-12 border-t border-border/50 w-full flex flex-col items-center">
        <p className="text-sm font-medium mb-6 uppercase tracking-wider text-muted-foreground">Supported Labs</p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 font-medium text-muted-foreground/80">
          <span>Dr Lal PathLabs</span>
          <span>Thyrocare</span>
          <span>Metropolis</span>
          <span>SRL Diagnostics</span>
          <span>Redcliffe Labs</span>
        </div>
      </div>
    </div>
  );
}
