import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function CommentsForm() {
  const { user, error, isLoading } = useUser();
  const [content, setContent] = useState("");

  const handleCommentPost = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/api/comments/`, {
        postId: id, // Ensure 'id' is defined or passed to this component
        content,
        authorName: user.name,
        authorImage: user.picture,
      });
      alert("Comment successfully posted");
      router.push("/"); // Ensure 'router' is defined/imported
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>; // Optional: loading state
  }

  return (
    <> 
      {!user ? (
        <div className="mt-8 bg-slate-300 p-8">
          <div className="p-8 bg-slate-200">
            <h3 className="text-xl p-2 text-center">
              Please Login to Comment
            </h3>
            <div className="flex justify-center">
              <Link href="/api/auth/login">
                <button className="btn btn-outline btn-accent px-8">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
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
    </>
  );
}
