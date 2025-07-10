// src/app/api/register/route.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
	const { email, password } = await req.json();

	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) {
		return new Response('Usuário já existe', { status: 400 });
	}

	const hashed = await hash(password, 10);

	await prisma.user.create({
		data: { email, password: hashed },
	});

	return new Response('Usuário criado com sucesso', { status: 201 });
}
