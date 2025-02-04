import React, { useState } from "react";
import SongList from "../components/SongList";
import SongManager from "../components/SongManager";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center gap-8 p-6">
      <h1 className="text-3xl font-bold text-white">🎵 Reproductor de Canciones</h1>
      <SongManager />
      <SongList />
    </div>
  );
};

export default Home;
