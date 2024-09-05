"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Blog = ({ params }) => {
  const { id } = params;
  const [posts, setPosts] = useState([]);
  const { user, error, isLoading } = useUser();
  const [comments, setComments] = useState([]);

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

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/`);
      const comment_data = response.data;
      if (Array.isArray(comment_data)) {
        setComments(comment_data);
      } else {
        setComments([comment_data]); // ถ้าไม่ใช่อาร์เรย์ ให้นำมาใส่ในอาร์เรย์
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPosts(id);
      fetchComments();
    }
  }, [id]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error(error);
    }
  };

  const [content, setContent] = useState("");

  const handleCommentPost = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/api/comments/`, {
        postId: id,
        content,
        authorName: user.name,
        authPic: user.picture,
      });
      alert("Comment successfully");
      router.push("/");
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
            <div className="basis-1/5 p-2">
              <p className="text-xl text-center">{post.authorName}</p>
              <img src={post.authPic} alt={`${post.authorName}'s avatar`} />
              <div className="bg-slate-100"></div>
            </div>

            <div className="basis-4/5 p-2 ">
              <p className="font-medium border-b-2">{post.title}</p>
              <div>
                <p>{post.content}</p>
              </div>
            </div>
          </div>

          {/* Fectch Comments */}
          {comments.map((comment) => (
            <div key={comment.id}>
              <div>
                <h3 className="text-xl bg-slate-300 p-2">
                  {comment.id} {comment.createdAt}{" "}
                </h3>
                <div className="flex flex-row ">
                  <div className="basis-1/5">
                    <p className="text-xl bg-base-200 p-2 text-center">
                      {comment.authorName}
                    </p>
                    {/* <img
                      src={comment.authPic}
                      alt={`${comment.authorName}'s avatar`}
                    /> */}
                    <div className="bg-slate-100"></div>
                  </div>
                  <div className="basis-4/5 px-5">
                    <div>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-8 bg-slate-300 p-8">
            <div className="p-8 bg-slate-200">
              <div>
                <h3 className="text-xl p-2 text-center">
                  Please Login to Comment
                </h3>
              </div>
              <div>
                <div className="flex flex-row justify-center">
                  <Link href="/api/auth/login">
                    <button class="btn btn-outline btn-accent px-8 ">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Form Comment */}
          {user && (
            <form onSubmit={createComment}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <div>
                        <label
                          htmlFor="content"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Add Comments
                        </label>
                        <textarea
                          name="content"
                          id="content"
                          required
                          value={content}
                          rows={4}
                          onChange={(e) => setContent(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link
                  href="/"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
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
