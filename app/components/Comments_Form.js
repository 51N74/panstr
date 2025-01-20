"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

export default function CommentsForm({ postId }) {
  const { user, error, isLoading } = useUser();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]); // กำหนด state สำหรับคอมเมนต์
  const router = useRouter();

  const handleCommentPost = async (e) => {
    e.preventDefault();
  
    console.log('content:', content);
    console.log('postId:', postId);
    console.log('user.email:', user?.email);
    console.log('user.name:', user?.name);
  
    if (!content || !postId || !user?.email || !user?.name || !user?.picture) {
      alert('Please fill in all fields.');
      return;
    }
  
    try {
      // ส่งคอมเมนต์ไปยัง API
      const response = await axios.post('/api/comments', {
        content,
        postId,
        userEmail: user.email,
        commentName: user.name,
        commentImage: user.picture,  // ส่งอีเมลของผู้ใช้จาก Auth0
      });
  
      if (response.status === 201 || response.status === 200) {
        alert('Comment created successfully');

        // อัปเดตคอมเมนต์ใน state โดยไม่ต้องรีโหลดหน้า
        setComments((prevComments) => [
          ...prevComments,
          response.data,  // เพิ่มคอมเมนต์ใหม่ลงในรายการ
        ]);
        router.refresh();
        // ล้างฟิลด์ content หลังจากส่งสำเร็จ
        setContent("");
      } else {
        // Handle non-2xx responses (not success)
        console.error('Unexpected response:', response);
        alert('Failed to create comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to create comment');
    }
  };
  
  const handleCancel = () => {
    setContent('');
  };

  return (
    <form onSubmit={handleCommentPost}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
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

      <div className="mt-6 flex justify-end gap-x-6">
        <button
          type="button"
          onClick={handleCancel}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}