import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//get comment
export async function GET() {
  try {
    return Response.json(await prisma.comment.findMany({
      
    }))  
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}

//create comment
export async function POST(req) {
  try {
    const { content, authorName, authorImage, postId } = await req.json();
    if (!content || !authorName || !authorImage || !postId) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), {
        status: 400,
      });
    }
    const comment = await prisma.comment.create({
      data: {
        content,
        authorName,
        authorImage,
        postId
      },
    });
    return new Response(JSON.stringify(comment), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

