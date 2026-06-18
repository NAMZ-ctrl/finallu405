import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/db";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
    authorized({request, auth}: any){
      // check for session cart cookie
      if (!request.cookies.get('sessionCartId')){
        // generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();

        //clone the req headers
        const newRequestHeaders = new Headers(request.headers);

        // create new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          }
        })
        
        // set newly generated sessionCartId in the response cookies
        response.cookies.set('sessionCartId', sessionCartId);
        return response;
      }else{
        return true;
      }
    }
  },
});
