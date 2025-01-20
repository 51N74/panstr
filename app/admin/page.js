// // pages/admin.js
// import { withAuthorization } from '../middleware/auth';

// function Admin() {
//   return (
//     <div>
//       <h1>Admin Panel</h1>
//       <a href="/api/auth/logout">Logout</a>
//       <p>Manage Threads and Users</p>
//     </div>
//   );
// }

// export default withAuthorization(Admin, ['Admin']);


'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function AdminPage() {
  // const { user, error, isLoading } = useUser();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  return (
<div>
  <h1>This is Admin Page</h1>
</div>

    // user && (
    //   <div className="flex">
    //   <h1>This is admin Page</h1>
    //     <div className="flex-1 flex flex-col items-center p-5 bg-base-100 shadow-xl rounded-lg">
    //       <div className="avatar">
    //         <div className="w-24 rounded-full">
    //           <img src={user.picture} alt={user.name} />
    //         </div>
    //       </div>
    //       <div>
    //         <h2 className="text-xl font-semibold">{user.name}</h2>
    //         <p className="text-gray-600">{user.email}</p>
    //         <p><strong>Nickname:</strong> {user.nickname}</p>
    //         <p><strong>Updated at:</strong> {user.updated_at}</p>
    //       </div>
    //     </div>
        
    //     <div className="flex-1 p-5">
    //       <h2 className="text-xl font-semibold">Your Posts</h2>
    //       {/* Placeholder for posts */}
    //       <div>Post content goes here...</div>
    //     </div>
    //   </div>
    // )
  );
}

