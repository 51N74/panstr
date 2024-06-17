import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    return Response.json(error);
  }
}

export async function POST(request, { params }) {
  try {
    const postID = Number(params.id);
    const { title, content } = await request.json();
    const newPost = await prisma.post.update({
      where: {
        id: postID,
      },
      data: {
        title,
        content,
      },
    });

    return Response.json(newPost);
  } catch (error) {
    return Response.json(error);
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

    return Response.json(deletePost, { message: "Delete Success ful" });
  } catch (error) {
    return Response.json(error);
  }
}
