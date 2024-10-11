
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    return Response.json(await prisma.post.findMany(
      {
        orderBy: {
          id: 'asc'
        }
      }
    ))  
  } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Error creating category' });
      }
}

export async function POST(req) {
  try {
    const { title, content, authorName, authorImage,authorEmail,categoryId } = await req.json();

    if (!title || !content || !authorName || !authorImage || !authorEmail || !categoryId) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), {
        status: 400,
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorName,
        authorImage,
        authorEmail,
        categoryId,
      },
    });

    return new Response(JSON.stringify(post), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in API:", error.message || error); // Log the error details
    return new Response(JSON.stringify({ message: "Internal Server Error", details: error.message }), {
      status: 500,
    });
  }
}
