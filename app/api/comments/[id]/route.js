import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get comment By ID
// export async function GET(request, { params }) {
//   try {
//     const commentID = Number(params.id);
//     const comment = await prisma.comment.findUnique({
//       where: {
//         id: commentID,
//       },
//     });

//     return Response.json(comment);
//   } catch (error) {
//     return Response.json(error, { status: 500 });
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

