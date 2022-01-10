import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import GameDetail from "./GameDetail";
import Spinner from "./Spinner";

async function fetchGameById(id) {
  const response = await fetch(`http://localhost:5000/api/games/${id}`);
  const gameResponse = await response.json();
  return gameResponse.data;
}
 
export default function Game() {
  const [gameData, setGameData] = useState();
  const params = useParams();
 
  useEffect(() => {
    fetchGameById(params.id)
      .then(gameData => setGameData(gameData));
 
    return;
  }, [params.id]);

  return (
    <div>
      <h3>Game Detail</h3>
      {!gameData ? <Spinner /> : <GameDetail gameData={gameData} />}
    </div>
  );
}