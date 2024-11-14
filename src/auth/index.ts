import NextAuth, { User, NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import { prisma } from '../../lib/prisma';

export const BASE_PATH = '/api/auth';

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Please provide both email and password.');
        }

        // Find the user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error(
            "No account found with this email. Don't have an account yet? Register here."
          );
        }

        // Compare the password
        const isValidPassword = await compare(
          credentials.password as string,
          user.password
        );

        if (!isValidPassword) {
          throw new Error('Invalid credentials. Please try again.');
        }

        if (!user.verified) {
          throw new Error('Please verify your email before logging in.');
        }

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email ?? undefined },
        });

        if (!existingUser) {
          const [firstName, ...lastNameParts] = user.name?.split(' ') ?? [''];
          const lastName = lastNameParts.join(' ') || '';
          const newUser = await prisma.user.create({
            data: {
              email: user.email ?? '',
              firstName: firstName || '',
              lastName: lastName,
              password: '',
              role: 'USER',
              verified: true,
            },
          });
          user.id = newUser.id;
        } else {
          user.id = existingUser.id;
        }
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
