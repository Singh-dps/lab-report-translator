'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface Report {
  id: string;
  labName: string;
  reportDate: string;
  patientName: string;
  summaryText: string;
  createdAt: string;
}

export default function ReportHistoryPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReports() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/reports/list');

        if (!res.ok) {
          throw new Error(`Failed to fetch reports: ${res.statusText}`);
        }

        const data = await res.json();
        setReports(data.reports || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load reports');
        setReports([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReports();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Your Reports</h1>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Your Reports</h1>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-3 pt-6">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">Error loading reports</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Your Reports</h1>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="mb-4 text-gray-600">No reports uploaded yet</p>
            <Link href="/">
              <Button>Upload Your First Report</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Reports</h1>
        <Link href="/">
          <Button>Upload New Report</Button>
        </Link>
      </div>

      <div className="space-y-3">
        {reports.map((report) => (
          <Link key={report.id} href={`/reports/${report.id}`}>
            <Card className="cursor-pointer transition-shadow hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{report.labName}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {formatDate(report.reportDate)}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Uploaded {formatDate(report.createdAt)}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-gray-700">
                  {report.summaryText}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
