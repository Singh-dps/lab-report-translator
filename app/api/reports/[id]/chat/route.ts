import { NextResponse } from "next/server";
import { getReportById, getMessagesByReportId, createMessage } from "@/db/queries";
import { handleChatMessage } from "@/lib/ai/chat";
import { MOCK_CHAT_MESSAGES } from "@/mocks/chat";
import { MOCK_REPORT } from "@/mocks/reports";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!process.env.DATABASE_URL) {
    // Return mock chat if no DB
    return NextResponse.json({ messages: MOCK_CHAT_MESSAGES });
  }
  const messages = await getMessagesByReportId(id);
  return NextResponse.json({ messages });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const { content } = await req.json();

    if (!process.env.DATABASE_URL || !process.env.XAI_API_KEY) {
       return NextResponse.json({ 
         message: { 
           id: "mock_new", 
           role: "assistant", 
           content: "Mock reply since backend services are disabled.", 
           createdAt: new Date().toISOString() 
         } 
       });
    }

    const report = await getReportById(id);
    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Save user message
    await createMessage({
      reportId: id,
      role: "user",
      content
    });

    const history = await getMessagesByReportId(id);
    
    // Call AI
    const replyContext = await handleChatMessage(report, history, content);

    // Save AI response
    const savedReply = await createMessage({
      reportId: id,
      role: "assistant",
      content: replyContext
    });

    return NextResponse.json({ message: savedReply });
  } catch (err: any) {
    console.error("Chat error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
