import ProfilePage from "@/components/myProfile/Profile";
import React from "react";
import { myFetch } from "../../../../../utils/myFetch";

export default async function page() {
  const res = await myFetch("/user/profile");

  return (
    <div>
      <ProfilePage data={res?.data} />
    </div>
  );
}
