// import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//get comment
// export async function GET() {
//   try {
//     return Response.json(await prisma.comment.findMany({
      
//     }))  
//   } catch (error) {
//     return Response.json(error, { status: 500 })
//   }
// }

export async function GET(request,{ params }) {
  try {
    // Extract the postId from the query parameters
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId'); // Get postId from the URL query

    if (!postId) {
      return new Response(JSON.stringify({ message: "postId is required" }), {
        status: 400,
      });
    }

    // Fetch comments that match the postId
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(postId),
      },
    });

    // Return the comments in the response
    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching comments:", error.message || error);
    return new Response(JSON.stringify({ message: "Internal Server Error", details: error.message }), {
      status: 500,
    });
  }
}

//create comment
export async function POST(req) {
  try {
    // Get data from the request
    const { content, postId, userEmail,commentName,commentImage } = await req.json();

    // Validation (you can add more checks here if needed)
    if (!content || !postId || !userEmail || !commentName || !commentImage) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), {
        status: 400,
      });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        post: {
          connect: { id: postId }, // ใช้ `connect` เพื่อเชื่อมกับโพสต์ที่มีอยู่
        },
        userEmail, // อีเมลผู้ใช้
        commentName,
        commentImage,
      },
    });
    
    return new Response(JSON.stringify(comment), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}


