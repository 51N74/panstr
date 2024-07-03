import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    return Response.json(await prisma.comments.findMany())  
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}

export async function POST(req){
  try {            
    const {postId, content, authorName, authPic} = await req.json()
    const comments = await prisma.comments.create({
      data: {
        postId: postId,
        content: content,
        authorName: authorName,
        authPic: authPic,
      },
    });
    return Response.json(comments);
    
  
} catch (error) {
return new Response(error, {
status: 500,
})
}
}

