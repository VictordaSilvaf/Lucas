import "./App.css";
import my_sound from "../src/music/radin.m4a";
import my_video from "../src/video/lucas.mp4";
import MediaPlayer from "./components/MediaPlayer";
import { useState } from "react";

function App() {
  const [interact, setInteract] = useState(false);

  return (
    <div className="bg-[#1f1f1f] min-h-[100dvh] h-full w-screen flex items-center justify-center py-8 flex-col text-caveat overflow-x-hidden px-6">
      {!interact ? (
        <button
          onClick={() => setInteract(true)}
          className="text-white bg-red-500 px-6 py-2 rounded-lg hover:bg-red-700 duration-300 ease-in-out text-caveat text-3xl"
        >
          Entrar ♥
        </button>
      ) : (
        <MediaPlayer my_sound={my_sound} my_video={my_video} />
      )}
    </div>
  );
}

export default App;
