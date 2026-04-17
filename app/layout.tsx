import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nidan — Understand Your Lab Report",
  description: "AI-powered lab report translator for Indian users.",
  openGraph: {
    title: "Nidan",
    description: "Understand your blood work in 60 seconds.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} min-h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
