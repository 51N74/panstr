import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET (){
     const post = await prisma.post.findMany()
    return Response.json( (post),{message: "Create Success ful"})
}

export  async function POST (request){
 const {title,content} = await request.json()
  const newPost = await prisma.post.create({
    data:{
        title,
        content
    }
 })
 return Response.json(newPost)
}