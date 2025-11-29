import EditProfilePage from "@/components/myProfile/EditProfile";
import React from "react";
import { myFetch } from "../../../../../utils/myFetch";

export default async function page() {
  const res = await myFetch("/user/profile");
  return (
    <div>
      <EditProfilePage data={res?.data} />
    </div>
  );
}
