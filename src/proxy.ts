import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  const publicRoutes = ['/auth/login', '/auth/register', '/', '/socialex/feed', '/socialex/profile', '/socialex/music', '/socialex/games', '/socialex/post/new', '/socialex/users'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Proteger el auth si tiene sessioooooonnn
  if (isPublicRoute && session?.user) {
    if (pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/socialex/feed', request.url));
    }
  }

  // Redirigir si no hay sesssssionnnn
  // Por qué carajos no fununcia?
  if (pathname.startsWith('/socialex') && !session?.user) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};