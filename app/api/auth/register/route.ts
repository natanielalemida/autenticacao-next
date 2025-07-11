import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	const { email, password } = await request.json();

	if (!email || !password) {
		return NextResponse.json(
			{ error: 'Email e senha são obrigatórios' },
			{ status: 400 }
		);
	}

	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		return NextResponse.json({ error: 'Usuário já existe' }, { status: 409 });
	}

	const hashedPassword = await hash(password, 10);

	await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
		},
	});

	return NextResponse.json(
		{ message: 'Usuário criado com sucesso' },
		{ status: 201 }
	);
}
