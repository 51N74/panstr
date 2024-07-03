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