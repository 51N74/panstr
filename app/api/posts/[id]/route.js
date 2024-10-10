import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get By ID
export async function GET(request, { params }) {
  try {
    const postID = Number(params.id);
    const post = await prisma.post.findUnique({
      where: {
        id: postID,
      },
    });

    return Response.json(post);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}


export async function PUT(request, { params }) {
  const postID = Number(params.id);
  try {
    // if (user.role !== 'Admin' && post.authorId !== user.sub) {
    //   return res.status(403).json({ message: 'Forbidden' });
    // }
    const { title, content } = req.body;
    const updatedPost = await prisma.post.update({
      where: { id: postID},
      data: { title, content },
    });
    return res.status(200).json(updatedPost);
  } catch (error) {
    return Response.json(error);
  }
}


// PATCH update an existing post
export async function PATCH(request, { params }) {
  try {
    // Parse the incoming JSON request body
    const { title, content, categoryId } = await request.json();
    const { id } = params; // Extract the 'id' from params (URL)

    // Validate the required fields
    if (!id || (!title && !content && !categoryId)) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update the post using Prisma
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        categoryId,
      },
    });

    // Return the updated post in the response
    return new Response(JSON.stringify(updatedPost), {
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

export async function DELETE(request, { params }) {
  try {
    const postID = Number(params.id);
    const deletePost = await prisma.post.delete({
      where: {
        id: postID,
      },
    });

    return Response.json({ message: "Delete Success ful" });
  } catch (error) {
    return Response.json(error);
  }
}
