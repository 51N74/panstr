'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect,useState } from "react";

const Blog = () =>{
    const [blog, setBlog] = useState([])
    useEffect(() => {
        getBlog()
      }, [])


const getBlog = async(id)=>{
    const response = await axios.get(`/api/posts/${id}`)
    setBlog(response.data)
    
  }

    return (
        <>
        <div>
        {/*Breadcrumb*/}
      <div className="text-sm breadcrumbs mx-4 mb-4">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Forums</a>
          </li>
          
        </ul>
      </div>
      <div class="mb-8">
        <h3 class="text-xl bg-slate-300 p-2">{blog.title}</h3>

        <div className="overflow-x-auto">
         {blog.createdAt}
        </div>
      </div>
    </div>
            <h1>Title: {blog.title}</h1>
            <p> Body: {blog.content}</p>
            <p>Author: {blog.author}</p>

            
        </>
    );
}
export default Blog