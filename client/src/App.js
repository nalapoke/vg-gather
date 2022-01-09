import React from "react";
import { Route, Routes } from "react-router-dom";
 
import GameDetail from "./components/gameDetail";
import Home from "./components/home";
 
const App = () => {
 return (
   <div>
     <Routes>
       <Route exact path="/" element={<Home />} />
       <Route path="/game/:id" element={<GameDetail />} />
     </Routes>
   </div>
 );
};
 
export default App;