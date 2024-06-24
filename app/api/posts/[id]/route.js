import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
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
    return Response.json(error, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const postID = Number(params.id);
  try {
    if (user.role !== 'Admin' && post.authorId !== user.sub) {
      return res.status(403).json({ message: 'Forbidden' });
    }
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
