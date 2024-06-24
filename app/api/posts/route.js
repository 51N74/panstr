import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function GET() {
  try {
    return Response.json(await prisma.post.findMany())  
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}

export async function POST(req,res) {
  const { user } = getSession(req, res);
  try {    
          if (user.role !== 'User' && user.role !== 'Admin') {
            return res.status(403).json({ message: 'Forbidden' });
          }
          const { title, content,user } = await req.json()
          const post = await prisma.post.create({
            data: {
              title,
              content,
              authorId: user.sub,
              
              authorName: authorName, 
            },
          });
          return res.status(201).json(post);
        
  } catch (error) {
    return new Response(error, {
      status: 500,
    })
  }
}



