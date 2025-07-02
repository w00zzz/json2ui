import NextAuth, { type DefaultSession, type NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@/db/generated/prisma";
import { comparePassword } from "@/backend/utils/hash";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: true,
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Credenciales faltantes');
          return null;
        }

        try {
          console.log('🔐 Intentando login con:', { email: credentials.email });
          
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
      
          if (!user) {
            console.log('❌ Usuario no encontrado');
            return null;
          }
          
          console.log('🔍 Usuario encontrado:', { email: user.email, hashedPassword: user.password });

          const isValid = await comparePassword(credentials.password, user.password);
          console.log('✅ Comparación de contraseñas:', isValid);

          if (!isValid) {
            console.log('❌ Contraseña incorrecta');
            console.log('Contraseña enviada:', credentials.password);
            console.log('Hash almacenado:', user.password);
            return null;
          }
      
          console.log('🎉 Login exitoso');
          return {
            id: user.id,
            name: user.username,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error('❌ Error en autorización:', error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
