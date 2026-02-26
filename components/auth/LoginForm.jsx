"use client";

import { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/actions/auth";
import { useAuth } from "@/app/hooks/useAuth";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, null);
  const { setAuth } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (state?.user) {
      setAuth(state.user);
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
    }
  }, [state, router, setAuth, searchParams]);

  return (
    <form className="login-form" action={formAction}>
      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      {state?.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
