export async function GET(request, { params }) {
    try {
      const postID = Number(params.id);
      const post = await prisma.comments.findUnique({
        where: {
          id: postID,
        },
      });
  
      return Response.json(post);
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


