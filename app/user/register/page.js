// import { getSession } from '@auth0/nextjs-auth0';
// import { useRouter } from "next/navigation";
// export default async function Profile() {
//   const { user } = await getSession();
//   const router = useRouter();
//   if(!user){
//     router.push("/api/auth/login");
//   }


//   return (

//       user && (
//           <div>
//             <img src={user.picture} alt={user.name} />
//             <h2>{user.name}</h2>
//             <p>{user.email}</p>
//           </div>
//       )
//   );
// }

export default async function RegisterPage() {
  
  return (
      <div>
        <h1>Register Page</h1>
      </div>
      )
  
}