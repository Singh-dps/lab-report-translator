'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth/client';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await authClient.getSession();
        const session = response.data;
        if (session?.user) {
          setUser(session.user);
        } else if (process.env.NODE_ENV === 'production') {
          router.push('/');
          return;
        }
      } catch {
        if (process.env.NODE_ENV === 'production') {
          router.push('/');
          return;
        }
      } finally {
        setIsChecking(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/');
  };

  if (isChecking) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between max-w-4xl">
          <Link href="/reports" className="font-heading text-2xl font-medium tracking-tight text-primary">
            Nidan
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/reports" className="text-sm text-gray-600 hover:text-foreground">
              Reports
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleSignOut}
            >
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
