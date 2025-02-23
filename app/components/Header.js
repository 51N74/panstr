"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function Header() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href="/">
            Panstr
          </a>
        </div>
        <div className="flex-none gap-2">
          <Link href="/api/auth/login">
            <button class="btn btn-outline btn-accent">Login</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href="/">
            Panstr
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <Link href="/create">
              <button class="btn btn-outline btn-primary">Create Post</button>
            </Link>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={user.picture} alt={user.name} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/user/profile">Profile</Link>
                {/* <a className="justify-between" href="/user">
                  Profile
                  <span className="badge">New</span>
                </a> */}
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a href="/api/auth/logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
