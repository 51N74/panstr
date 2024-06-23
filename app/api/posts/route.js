import { PrismaClient } from '@prisma/client'
import { getSession } from '@auth0/nextjs-auth0';

const prisma = new PrismaClient()


export async function getUser(req, res) {
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
  

export async function GET() {

  return Response.json(await prisma.post.findMany())
}

export async function POST(req) {
  try {
    getUser()
    
    const { title, content,user } = await req.json()

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        user
      },
    })
    return Response.json(newPost,)
  } catch (error) {
    return new Response(error, {
      status: 500,
    })
  }
}