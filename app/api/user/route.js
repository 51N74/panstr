// pages/api/user.js
import { getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  try {
    const session = getSession(req, res);
    if (!session || !session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const auth0Id = session.user.sub; // Auth0 user ID
    const email = session.user.email;

    // Check if user exists
    let user = await prisma.user.findUnique({ where: { auth0Id } });

    // If not, create a new user
    if (!user) {
      user = await prisma.user.create({
        data: {
          auth0Id,
          email,
        },
      });
    }

    // Proceed with your logic
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
