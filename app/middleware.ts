import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedPaths = ['/dashboard', '/api/users'];

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if (protectedPaths.some((path) => pathname.startsWith(path))) {
		const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

		if (!token) {
			const loginUrl = new URL('/', req.url);
			loginUrl.searchParams.set('callbackUrl', req.url);
			return NextResponse.redirect(loginUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*', '/api/users/:path*'],
};
