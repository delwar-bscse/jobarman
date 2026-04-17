import FavoriteListPage from "@/components/jobSeeker/favoriteList/FavoriteList";
import React from "react";
import { myFetch } from "../../../../../utils/myFetch";

export default async function FavoriteList() {
  const favorites = await myFetch("/favourite", { 
    tags: ["favoritesList"],
    method: "GET",
    cache: "no-store",
  });
  console.log("Favlist : ", favorites?.data)
  
  return (
    <>
      <FavoriteListPage data={favorites?.data} />
    </>
  );
}
