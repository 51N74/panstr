import axios from "axios";
import Link from "next/link";
async function getBlogs(){
  const response = await axios.get('https://6664041f932baf9032a9ab94.mockapi.io/blog')
  return response.data
}

export default async function Page() {
  const blogs = await getBlogs()
  return (
      <div className="container mx-auto px-4 h-full">
          
          {
            blogs.map((blog,index)=>(
              <Link href={`/blog/${blog.id}`}>
              <div key={index}>
                {blog.id}
                {blog.title}
                {blog.name}
              </div>
              </Link>
            ))
          }  
      </div>
  );
}
