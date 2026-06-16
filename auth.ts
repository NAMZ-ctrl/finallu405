import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/db";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // checking if the user exists
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        // comparing the password together
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password,
          );
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      session.user.id = token.sub;
      if (trigger === "update") {
        session.user.name = user.name; // ← also fixed: you had === instead of =
      }
      return session; // ← must return session in v5
    },
  },
});
