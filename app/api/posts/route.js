import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET (){
    try {
        const post = await prisma.post.findMany()
        return Response.json( post)
    } catch (error) {
        return Response.json(error)
    }

    
}

export  async function POST (request){
    try {
        const {title,content} = await request.json()
  const newPost = await prisma.post.create({
    data:{
        title,
        content
    }
 })
 return Response.json((newPost,{message: "Create Success ful"}))
    } catch (error) {
        return Response.json(error)
    }


 
}