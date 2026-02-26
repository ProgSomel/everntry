"use client";

import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInOut() {
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  const Logout = () => {
    setAuth(null);
    router.push("/login");
  };
  return (
    <div>
      {auth ? (
        <>
          <span className="mx-2">Hello, <span className="text-indigo-400 font-semibold">{auth.name}</span></span>
          <span className="mx-1">|</span>
          <a className="cursor-pointer text-red-400 hover:text-red-300 transition-colors" onClick={Logout}>
            Logout
          </a>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
