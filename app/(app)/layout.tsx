import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between max-w-4xl">
          <Link href="/" className="font-heading text-2xl font-medium tracking-tight text-primary">
            Nidan
          </Link>
          <nav>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Sign Out
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
        {children}
      </main>
    </div>
  );
}
