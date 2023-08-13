import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",

          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password Required");
        }
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          if (!user || !user?.hashedPassword) {
            throw new Error("Email does not exist");
          }

          const isCorrectPassword = await compare(
            credentials.password,
            user.hashedPassword
          );

          if (!isCorrectPassword) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (error) {
          console.log(error);
          throw new Error("Error during authentication");
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user.id);

      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      session.user = token.user;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  jwt: { secret: process.env.NEXTAUTH_JWT_SECRET },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    return await NextAuth(request, response, authOptions);
  } catch (error: any) {
    response.status(401).json({ error: error.message });
  }
};

export { handler as GET, handler as POST };
