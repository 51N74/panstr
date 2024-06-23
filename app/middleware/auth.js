import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

export function withAuthorization(handler, allowedRoles) {
  return withApiAuthRequired(async (req, res) => {
    const session = getSession(req, res);
    const user = session?.user;
    
    if (!user || !allowedRoles.includes(user.role)) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    return handler(req, res);
  });
}
