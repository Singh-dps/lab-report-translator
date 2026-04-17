import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { db } from "@/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock');

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: false,
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }) => {
        if (!process.env.RESEND_API_KEY) {
          console.log("Mock Magic Link generated:", url);
          // In dev mode without resend, just log it 
          return;
        }
        
        await resend.emails.send({
          from: "Nidan <onboarding@resend.dev>",
          to: email,
          subject: "Your Nidan Magic Link",
          html: `<p>Click <a href="${url}">here</a> to sign in to Nidan.</p>`,
        });
      },
    }),
  ],
});
