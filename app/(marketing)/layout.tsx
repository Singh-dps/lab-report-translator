export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
      <main className="w-full max-w-4xl px-4 py-8 md:py-16">
        {children}
      </main>
    </div>
  );
}
