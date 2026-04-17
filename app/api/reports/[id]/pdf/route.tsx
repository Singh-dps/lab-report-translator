import { NextResponse } from 'next/server';
import ReactPDF from '@react-pdf/renderer';
import { DoctorSummaryPDF } from '@/lib/pdf/doctor-summary';
import { getReportById } from '@/db/queries';
import { MOCK_REPORT } from '@/mocks/reports';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    let report = MOCK_REPORT;
    if (process.env.DATABASE_URL) {
      const dbReport = await getReportById(id);
      if (dbReport) {
        report = dbReport;
      }
    }

    const stream = await ReactPDF.renderToStream(<DoctorSummaryPDF report={report} />);
    
    return new NextResponse(stream as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="Nidan-Report-${report.patientName || id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF gen error:", error);
    return new NextResponse('Error generating PDF', { status: 500 });
  }
}
