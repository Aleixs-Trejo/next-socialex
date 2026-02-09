import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware, APIError } from "better-auth/api";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  appName: "Socialex",
  trustedOrigins: ["http://localhost:3000", "https://next-socialex.vercel.app"],
  secret: process.env.BETTER_AUTH_SECRET as string,
  baseURL: process.env.BETTER_AUTH_URL as string,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60
    }
  },
  socialProviders: {
    google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`
		},
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      onboardingCompleted: {
        type: "boolean",
        defaultValue: false,
      },
      statusProfile: {
        type: "string",
        defaultValue: "OFFLINE",
      },
      statusAccount: {
        type: "string",
        defaultValue: "ACTIVE",
      },
      onboardingToken: {
        type: "string",
        required: false,
      },
      onboardingTokenExpires: {
        type: "date",
        required: false,
      },
    }
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-in/email") {
        const { email } = ctx.body ?? {};

        if (!email) return;

        const dbUser = await prisma.user.findUnique({
          where: { email },
          include: { accounts: true },
        });

        if (!dbUser) return;

        if (dbUser.statusAccount === "INACTIVE") {
          throw new APIError("UNAUTHORIZED", { message: "Cuenta inactiva" });
        }
      }

      if (ctx.path.startsWith("/oauth2/callback/google")) {
        const email = ctx.context?.newSession?.user?.email;

        if (!email) return;

        const dbUser = await prisma.user.findUnique({ where: { email }, include: { accounts: true } });

        if (!dbUser) return;

        if (dbUser.statusAccount === "INACTIVE") {
          throw new APIError("UNAUTHORIZED", { message: "Cuenta inactiva" });
        }
      }
    }),

    after: createAuthMiddleware(async (ctx) => {

      const newSession = ctx.context.newSession;
      if (!newSession) return;

      const email = newSession.user.email;
      if (!email) return;

      await prisma.user.update({
        where: { email },
        data: { statusProfile: "ONLINE" },
      });

      if (ctx.path.startsWith("/oauth2/callback/google")) {
        const token = crypto.randomUUID();

        await prisma.user.update({
          where: { email },
          data: {
            onboardingToken: token,
            onboardingTokenExpires: new Date(
              Date.now() + 15 * 60 * 1000
            ),
          },
        });
      }
    }),
  },
});