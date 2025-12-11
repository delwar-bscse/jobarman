"use server";

import { cookies } from "next/headers";


export async function getUserRole() {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value || null;

  return role;
}