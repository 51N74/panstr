"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Blog = ({ params }) => {
  const { id } = params;
  const [posts, setPosts] = useState([]);
  const { user, error, isLoading } = useUser();

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

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error(error);
    }
  };
  
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
        <div key={post.id} className="px-8 mb-8">
          <div className="text-xl bg-slate-300 p-2"> 
          <h3> หัวข้อ: {post.title}</h3>
          
          </div>
          
          {/* แสดงปุ่ม Delete หาก user.name ตรงกับ post.authorName */}
        {user && user.name === post.authorName && (
            <div>
              <button
                onClick={() => handleDelete(post.id)}
                className="mt-4 bg-red-600 text-white px-3 py-2 rounded-md"
              >
                Delete
              </button>
              
            </div>
          )}




          
          
        
          
          <div className="flex flex-row ">
            {/*Menu Forums*/}
            <div className="basis-1/5">
              <p className="text-xl bg-base-200 p-2 text-center">{post.authorName}</p>
              <img src={post.authPic} alt={`${post.authorName}'s avatar`} />
              <div className="bg-slate-100"></div>
            </div>

            <div className="basis-4/5 px-5 ">
              <p className="font-medium border-b-2">{post.title}</p>
              <div>
                <p>{post.content}</p>
              </div>
            </div>
          </div>

          {/* Fectch Comments */}
          <h3 className="text-xl bg-slate-300 p-2">#1 {post.createdAt} </h3>

          <div className="flex flex-row ">
            <div className="basis-1/5">
              <p className="text-xl bg-base-200 p-2 text-center">First Comments</p>
              <img src={post.authPic} alt={`${post.authorName}'s avatar`} />
              <div className="bg-slate-100"></div>
            </div>

            <div className="basis-4/5 px-5 ">
              <div>
                <p>{post.content}</p>
              </div>
            </div>
          </div>

          {/* Form Comment */}
          {user && (
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                          Add Comments by 
                        </label>
                        <textarea
                          name="content"
                          id="content"
                          required
                          rows={4}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href="/" className="text-sm font-semibold leading-6 text-gray-900">
                  <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                  </button>
                </Link>

                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      ))}
    </div>
  );
};

export default Blog;
