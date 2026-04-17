import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { auth } from "./index";
import { db } from "@/db";
import { user } from "@/db/schema";

// Temporary — real auth UI lands later. Until then, dev flows fall back to a seeded user.
const DEV_USER_ID = "dev-user-local";
const DEV_USER_EMAIL = "dev@nidan.local";

async function ensureDevUser(): Promise<string> {
  const existing = await db.select().from(user).where(eq(user.id, DEV_USER_ID));
  if (existing.length === 0) {
    const now = new Date();
    await db.insert(user).values({
      id: DEV_USER_ID,
      email: DEV_USER_EMAIL,
      name: "Dev User",
      emailVerified: true,
      createdAt: now,
      updatedAt: now,
    });
  }
  return DEV_USER_ID;
}

export async function getCurrentUserId(): Promise<string | null> {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (session?.user?.id) return session.user.id;

  if (process.env.NODE_ENV !== "production" && process.env.DATABASE_URL) {
    return ensureDevUser();
  }

  return null;
}
