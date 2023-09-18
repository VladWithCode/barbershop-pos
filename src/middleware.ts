import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const token = request.cookies.get('access_token');

	if (!token && !path.startsWith('/login'))
		return NextResponse.redirect(new URL('/login', request.url));

	if (token && path.startsWith('/login'))
		return NextResponse.redirect(new URL('/', request.url));

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|sprites.svg|logo-w.webp).*)',
	],
};
