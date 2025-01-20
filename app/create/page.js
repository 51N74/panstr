"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const { user } = useUser();
  const router = useRouter();

const categories_name = [
  { id: 1, name: "News" },
  { id: 2, name: "Main Forum" },
];
  // useEffect(() => {
  //   // Fetch categories when component mounts
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get("/api/category");
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!categoryId) {
      alert("Please select a category");
      return;
    }

    try {
      await axios.post("/api/posts", {
        title,
        content,
        categoryId: parseInt(categoryId),
        authorName: user.name,
        authorImage: user.picture,
        authorEmail: user.email
      });
      alert("Post created successfully");
      router.push("/");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-lg space-y-8 rounded-lg bg-white p-8 shadow-lg"
  >
    <div className="space-y-6">
      <h2 className="text-lg font-bold leading-7 text-gray-800">
        Create New Post
      </h2>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select a category</option>
          {categories_name.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          name="content"
          id="content"
          required
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>

    <div className="mt-6 flex items-center justify-end gap-4">
      <Link
        href="/"
        className="text-sm font-medium text-indigo-600 hover:underline"
      >
        Cancel
      </Link>
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Create Post
      </button>
    </div>
  </form>
</div>

  );
}