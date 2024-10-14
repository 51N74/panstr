import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
  

export async function GET(request, { params }) {
  try {
    const commentID = Number(params.id);
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentID,
      },
    });

    return Response.json(comment);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}



export async function DELETE(request, { params }) {
  try {
    const commentID = Number(params.id);
    const deleteComment = await prisma.comment.delete({
      where: {
        id: commentID,
      },
    });

    return Response.json({ message: "Delete Success ful" });
  } catch (error) {
    return Response.json(error);
  }
}

// PATCH update an existing comment
export async function PATCH(request, { params }) {
  try {
    // Parse the incoming JSON request body
    const {content } = await request.json();
    const { id } = params; // Extract the 'id' from params (URL)

    // Validate the required fields
    if (!id || !content) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update the Comment using Prisma
    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: {        
        content,
      },
    });

    // Return the updated post in the response
    return new Response(JSON.stringify(updatedComment), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating post:", error.message || error);

    // Return an error response with the details
    return new Response(JSON.stringify({ message: "Internal Server Error", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}