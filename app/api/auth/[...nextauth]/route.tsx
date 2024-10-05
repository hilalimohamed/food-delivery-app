/* eslint-disable */
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { JWT } from "next-auth/jwt";

// console.log({
//   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
//   GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
//   GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
//   AUTH_SECRET: process.env.AUTH_SECRET,
// });

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing email or password");
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.error("User not found");
          throw new Error("User not found");
        }

        if (!user.password) {
          console.error("User does not have a password");
          throw new Error("User does not have a password");
        }

        const isPasswordValid = bcrypt.compareSync(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          console.error("Invalid password");
          throw new Error("Invalid password");
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      // Log the token to the console
      // console.log("JWT callback token:", token.role);

      return token;
    },
    async session({ session, token }: { session: DefaultSession; token: JWT }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
} as NextAuthOptions;

// const handler = (req: NextApiRequest, res: NextApiResponse) =>
const handler = (req: CombineRequest, res: CombineResponse) =>
  NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
