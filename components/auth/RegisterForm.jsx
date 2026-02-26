"use client";

import { useActionState } from "react";
import { register } from "@/actions/auth";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, null);

  return (
    <form className="login-form" action={formAction}>
      <div>
        <label htmlFor="name">Full Name</label>
        <input type="text" name="name" id="name" />
        {state?.errors?.name && (
          <p className="text-red-500 text-xs mt-1">{state.errors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" id="email" />
        {state?.errors?.email && (
          <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        {state?.errors?.password && (
          <p className="text-red-500 text-xs mt-1">{state.errors.password}</p>
        )}
      </div>
      <div>
        <label htmlFor="phone">Phone Number</label>
        <input type="tel" name="phone" id="phone" />
      </div>
      <div>
        <label htmlFor="bio">Bio</label>
        <input className="min-h-16" type="text" name="bio" id="bio" />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
