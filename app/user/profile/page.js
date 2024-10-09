'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className="flex">
      
        <div className="flex-1 flex flex-col items-center p-5 bg-base-100 shadow-xl rounded-lg">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={user.picture} alt={user.name} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p><strong>Nickname:</strong> {user.nickname}</p>
            <p><strong>Updated at:</strong> {user.updated_at}</p>
            <p><strong>Email at:</strong> {user.email}</p>
          </div>
        </div>
        
        <div className="flex-1 p-5">
          <h2 className="text-xl font-semibold">Your Posts</h2>
          {/* Placeholder for posts */}
          <div>Post content goes here...</div>
        </div>
      </div>
    )
  );
}
