import FavoriteListPage from "@/components/jobSeeker/favoriteList/FavoriteList";
import React from "react";
import { myFetch } from "../../../../../utils/myFetch";

export default async function FavoriteList() {
  const favorites = await myFetch("/favourite?limit=100", { 
    tags: ["favoritesList"],
    method: "GET",
    cache: "no-store",
  });
  // console.log("FavList 111: ", favorites?.data)

  return (
    <>
      <FavoriteListPage data={favorites?.data} />
    </>
  );
}
