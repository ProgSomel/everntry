"use server"; //? for server-action, you have to use it

import { createUser, getUserByEmail } from "@/db/queries";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function register(_prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const phone = formData.get("phone");
  const bio = formData.get("bio");

  // Validation
  const errors = {};

  if (!name || name.trim().length < 2)
    errors.name = "Full name must be at least 2 characters.";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please enter a valid email address.";

  if (!password || password.length < 6)
    errors.password = "Password must be at least 6 characters.";

  if (Object.keys(errors).length > 0) return { errors };

  // Check duplicate email
  const existing = await getUserByEmail(email);
  if (existing)
    return { errors: { email: "An account with this email already exists." } };

  const hashedPassword = await bcrypt.hash(password, 10);

  await createUser({ name, email, password: hashedPassword, phone, bio });

  redirect("/login");
}

export async function login(_prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const user = await getUserByEmail(email);
  if (!user) return { error: "No user found with this email." };

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return { error: "Invalid password." };

  return { user: { id: user.id, name: user.name, email: user.email } };
}
