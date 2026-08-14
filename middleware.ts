import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Assuming you have an auth function from next-auth setup
// import { auth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // const session = await auth();
  
  // This is a basic middleware structure.
  // Uncomment and modify the auth logic according to your auth setup
  
  const { pathname } = request.nextUrl;
  
  // Apply security headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  /*
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (pathname.startsWith('/admin')) {
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  */

  return response;
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
