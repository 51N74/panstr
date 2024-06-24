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

export async function POST(req){
  try {            
    const { title, content,authorName } = await req.json()
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorName
        // authorId: user.sub,            
        // authorName: authorName, 
      },
    });
    return Response.json(post);
    
  
} catch (error) {
return new Response(error, {
status: 500,
})
}
}

