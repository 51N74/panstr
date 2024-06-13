import axios from "axios";
import Link from "next/link";
async function getBlogs(){
  const response = await axios.get('https://6664041f932baf9032a9ab94.mockapi.io/blog')
  return response.data
}

export default async function Page() {
  const blogs = await getBlogs()
  return (
      <div>
          
          {
            blogs.map((blog,index)=>(

             
             <div className="w-1/2 m-4" key={index}>
              <Link href={`/blog/${blog.id}`}>
              <div >
                {blog.id}
                {blog.title}
                {blog.name}
              </div>
              </Link>
              </div>         
            ))
          }  

<a href="/api/auth/login">Login</a>
      </div>
  );
}
