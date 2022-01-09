import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
 
const Game = (props) => (
  <ul>
    <li>Name: {props.game.name}</li>
    <li>Summary: {props.game.summary}</li>
  </ul>
);

const mockJson = `{"success":true,"data":{"id":18196,"name":"Pocket Card Jockey","platforms":[{"id":37,"name":"Nintendo 3DS"}],"release_dates":[{"id":47790,"human":"May 01, 2016"},{"id":142318,"human":"May 05, 2016"},{"id":142319,"human":"May 05, 2016"}],"screenshots":[{"id":21371,"url":"//images.igdb.com/igdb/image/upload/t_thumb/l5eiqpryqgzfuo47s9qt.jpg"},{"id":21372,"url":"//images.igdb.com/igdb/image/upload/t_thumb/bqunlseu2vuaneqjlitg.jpg"},{"id":169180,"url":"//images.igdb.com/igdb/image/upload/t_thumb/c8ego8tlaxu669rqns72.jpg"},{"id":169181,"url":"//images.igdb.com/igdb/image/upload/t_thumb/kciqja0ezudocvxhpbuz.jpg"},{"id":169182,"url":"//images.igdb.com/igdb/image/upload/t_thumb/o8oujyjjvqhgogdlksgb.jpg"}],"summary":"A hybrid horse racing/solitaire game for the 3DS. Produced by Game Freak."}}`
 
export default function GameDetail() {
  const [gameDetail, setGameDetail] = useState({});
  const params = useParams();
 
  useEffect(() => {
    async function getGameById() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/api/games/${id}`);
      //const response = mockJson;
 
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