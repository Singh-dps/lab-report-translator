import type { ChatMessage } from "../types/api";

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg_1",
    role: "user",
    content: "What should I ask my doctor about this report?",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "msg_2",
    role: "assistant",
    content: "Based on your report, here are the top 3 questions you should discuss with your doctor:\n\n1. **About your Vitamin D (12.5 ng/mL - Low):** \"Given my severe Vitamin D deficiency, would you recommend a weekly high-dose supplement (like a 60K softgel) or daily drops?\"\n\n2. **About your TSH (6.2 µIU/mL - High):** \"My TSH is slightly elevated. Is this level high enough to require daily medication like Thyroxine, or should we monitor it?\"\n\n3. **About your HbA1c (6.0% - High):** \"With an HbA1c confirming I am in the prediabetic range, do I need to start any medication right now, or can we try lifestyle changes like diet and exercise first?\"",
    createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
  },
  {
    id: "msg_3",
    role: "user",
    content: "Is my cholesterol okay?",
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    id: "msg_4",
    role: "assistant",
    content: "Yes, your cholesterol profile looks great! Your Total Cholesterol is 185 mg/dL (well within the healthy range of <200). Additionally, your HDL ('good' cholesterol) is a healthy 55 mg/dL, and your LDL ('bad' cholesterol) is 104 mg/dL. Your triglycerides are also normal at 130 mg/dL.\n\nKeep up whatever you're currently doing regarding your diet and physical activity in this aspect!",
    createdAt: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
  }
];
