import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req, res) {
  try {
    const session = await getSession(req, res);
    if (session) {
      const { user } = session;
      res.status(200).json({ name: user.name });
    } else {
      res.status(401).json({ error: 'User not authenticated' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
