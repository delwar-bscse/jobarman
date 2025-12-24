// import ScoreBoard from "@/components/guest/score-board/ScoreBoard";
import ScoreBoard from "@/components/guest/score-board/ScoreBoard";
import React from "react";

export default async function page({ params }) {
  const id = (await params)?.id;

  return (
    <>
      <ScoreBoard id={id} />
    </>
  );
}
