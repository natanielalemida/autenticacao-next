import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	if (!token) {
		return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
	}

	try {
		const users = await prisma.user.findMany({
			select: { id: true, email: true, createdAt: true, updatedAt: true },
			orderBy: { createdAt: 'desc' },
		});
		return NextResponse.json(users);
	} catch {
		return NextResponse.json(
			{ error: 'Erro ao buscar usuários' },
			{ status: 500 }
		);
	}
}
