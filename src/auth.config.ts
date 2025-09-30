import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod';
import { prisma } from './lib/prisma';
import bcryptjs from 'bcryptjs';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user; // agrega datos del user al token
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null; // Formulario no es valido

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return null;

        if (!bcryptjs.compareSync(password, user.password)) return null;

        // Regresar la propiedad del usuario menos el passoword _
        const { password: _, ...rest } = user;

        //console.log(rest)

        return rest;
      },
    }),
  ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)