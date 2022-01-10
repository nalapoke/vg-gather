import React from "react";
import { Route, Routes } from "react-router-dom";
 
import Game from "./components/Game";
import Home from "./components/Home";
 
export default function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/game/:id" element={<Game />} />
      </Routes>
    </div>
  );
};
