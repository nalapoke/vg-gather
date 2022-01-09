import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
 
const Game = (props) => (
  <ul>
    <li>Name: {props.game.name}</li>
    <li>Summary: {props.game.summary}</li>
  </ul>
);
 
export default function GameDetail() {
  const [gameDetail, setGameDetail] = useState({});
  const params = useParams();
 
  useEffect(() => {
    async function getGameById() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/api/games/${id}`);
 
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
 
      const gameDetail = await response.json();
      setGameDetail(gameDetail.data);
    }
 
    getGameById(params.id);
 
    return;
  }, [params.id]);
 
  return (
    <div>
      <h3>Game Detail</h3>
      <div className="game-detail">
        <Game game={gameDetail} />
      </div>
    </div>
  );
}