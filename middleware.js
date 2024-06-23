import { NextResponse } from "next/server";
import { withMiddlewareAuthRequired, getSession } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired(async (req) => {
  const res = NextResponse.next();

  const session = await getSession(req, res);
  const user = session?.user;

  if (!user) {
    return NextResponse.redirect("/api/auth/login");
  }

  // ตรวจสอบบทบาทของผู้ใช้
  const allowedRoles = req.nextUrl.pathname.startsWith('/admin') ? ['Admin'] : ['User', 'Admin'];

  if (!allowedRoles.includes(user.role)) {
    return NextResponse.redirect("/api/auth/login");
  }

  return res;
});

export const config = {
  matcher: ['/profile', '/admin/:path*'],
};
