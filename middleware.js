import { NextResponse } from 'next/server';
import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired(async (req) => {
  const res = NextResponse.next();
  const session = await getSession(req, res);
  const user = session?.user;

  if (!user) {
    // ผู้ใช้ที่ไม่ได้เข้าสู่ระบบสามารถเข้าถึงเฉพาะหน้า Blog ทั่วไป
    if (req.nextUrl.pathname.startsWith('/')) {
      return res;
    }
    return NextResponse.redirect(new URL('/api/auth/login', req.url));
  }

  const userRole = user.role;

  if (req.nextUrl.pathname.startsWith('/admin')) {
    // เฉพาะผู้ใช้ที่มี role เป็น 'Admin' เท่านั้นที่สามารถเข้าถึงได้
    if (userRole !== 'Admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else if (req.nextUrl.pathname.startsWith('/user')) {
    // เฉพาะผู้ใช้ที่เข้าสู่ระบบ (role เป็น 'User' หรือ 'Admin') เท่านั้นที่สามารถเข้าถึงได้
    if (userRole !== 'User' && userRole !== 'Admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return res;
});

export const config = {
  matcher: ['/blog/:path*', '/user/:path*', '/admin/:path*'],
};
