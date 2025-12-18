// import ScoreBoard from "@/components/guest/score-board/ScoreBoard";
import ScoreBoard from "@/components/guest/score-board/ScoreBoard";
import React from "react";

export default async function page({ params }) {
  const id = (await params)?.id;
  console.log("res", id);
  return (
    <>
      <ScoreBoard id={id} />
    </>
  );
}
