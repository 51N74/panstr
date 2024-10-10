import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get comment By ID
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
  

export async function POST(req){
  const createComment = async (postId, content, authorName, authPic) => {
    try {
      const comment = await prisma.comment.create({
        data: {
          content,
          authorName,
          authorImage,
          postId,
        },
      });
      return comment;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }
  }


