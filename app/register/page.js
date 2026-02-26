import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register",
  description: "Create a free Eventry account to discover and join events near you.",
};

export default function Register() {
  return (
    <section className="h-screen grid place-items-center">
      <div className="max-w-112.5 w-full mx-auto p-6 border border-gray-700/20 rounded-md">
        <h4 className="font-bold text-2xl">Register</h4>

        <RegisterForm />

        <span className="text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link className="underline hover:text-indigo-600" href="/login">
            Login
          </Link>
        </span>
      </div>
    </section>
  );
}
