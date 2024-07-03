import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    return Response.json(await prisma.comments.findMany({
      
    }))  
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}



