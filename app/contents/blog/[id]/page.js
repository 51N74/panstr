"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Blog = ({ params }) => {
  const { id } = params;
  const [posts, setPosts] = useState([]);

  const fetchPosts = async (id) => {
    try {
      const response = await axios.get(`/api/posts/${id}`);
      const data = response.data;
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        setPosts([data]); // ถ้าไม่ใช่อาร์เรย์ ให้นำมาใส่ในอาร์เรย์
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPosts(id);
    }
  }, [id]);

  return (
    <div>
      {/*Breadcrumb*/}
      <div className="text-sm breadcrumbs mx-4 mb-4">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/contents/forums/news">Forums</a>
          </li>
        </ul>
      </div>

      {posts.map((post) => (
        <div class="px-8 mb-8">
          <h3 class="text-xl bg-slate-300 p-2"> หัวข้อ {post.title}</h3>
          
            <div class="flex flex-row ">
              {/*Menu Forums*/}
              <div class="basis-1/5">
                <p class="text-xl bg-base-200 p-2 text-center	">{post.user}</p>
                <div className="bg-slate-100"></div>
              </div>

              <div class="basis-4/5 px-5 ">

                <p class="font-medium border-b-2">{post.title}</p>
                <div>
                  <p>{post.content}</p>
                  </div>  
              </div>        
          </div>
        </div>
      ))}
    </div>
  );
};
export default Blog;
