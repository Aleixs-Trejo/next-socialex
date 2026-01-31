import NextAuth, { type NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { z } from "zod";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z.object({ email: z.string(), password: z.string().min(6) }).safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

        if (!user) return null;

        if (user.statusAccount === "INACTIVE") return null;
        // if (!user.emailVerified) return null;
        if (!user?.passwordHashed) return null;

        const isValidPassword = await bcrypt.compare(password, user.passwordHashed);
        
        if (!isValidPassword) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          statusProfile: user.statusProfile,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {

      if (account?.provider === "google") {
        const token = crypto.randomUUID();

        await prisma.user.update({
          where: { email: user.email! },
          data: {
            onboardingToken: token,
            onboardingTokenExpires: new Date(Date.now() + 15 * 60 * 1000),
          },
        });

        (user as any).onboardingToken = token; // Any porque no reconoce la vaina esta
      }

      const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
        include: {
          accounts: true,
        }
      });

      if (!dbUser) return true;

      if (
        account?.provider === 'google' &&
        dbUser.passwordHashed &&
        !dbUser.accounts.some(a => a.provider === 'google')
      ) {
        return false;
      }

      if (dbUser?.statusAccount === 'INACTIVE') return false;

      await prisma.user.update({
        where: { id: dbUser.id },
        data: { statusProfile: 'ONLINE' },
      });

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.image) token.image = session.image;
        if (session.onboardingCompleted !== undefined) {
          token.onboardingCompleted = session.onboardingCompleted;
        }
      }

      if (user) {
        token.id = user.id;
        token.statusProfile = user.statusProfile;
        return token;
      }

      const dbUser = await prisma.user.findUnique({
        where: { id: token.id as string },
        select: {
          statusProfile: true,
          image: true,
          onboardingCompleted: true,
        },
      });

      if (dbUser) {
        token.statusProfile = dbUser.statusProfile;
        token.image = dbUser.image;
        token.onboardingCompleted = dbUser.onboardingCompleted;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.statusProfile = token.statusProfile as "ONLINE" | "OFFLINE";
        session.user.image = token.image as string;
        session.user.onboardingCompleted = token.onboardingCompleted as boolean;
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);