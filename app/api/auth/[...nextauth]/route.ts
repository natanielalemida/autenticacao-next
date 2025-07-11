import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Senha', type: 'password' },
			},
			async authorize(credentials) {
				const user = await prisma.user.findUnique({
					where: { email: credentials!.email },
				});
				if (!user || !(await compare(credentials!.password, user.password)))
					return null;
				return { id: user.id, email: user.email };
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],

	session: {
		strategy: 'jwt',
	},

	// 🔽 Aqui você cria o usuário caso ele venha do Google e ainda não exista no banco
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === 'google') {
				const existingUser = await prisma.user.findUnique({
					where: { email: user.email! },
				});

				if (!existingUser) {
					await prisma.user.create({
						data: {
							email: user.email!,
							password: '', // ou null, dependendo do seu schema
						},
					});
				}
			}
			return true;
		},
	},

	pages: {
		signIn: '/',
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
