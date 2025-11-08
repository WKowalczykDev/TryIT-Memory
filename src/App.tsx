import { useState } from "react";
import Player from "./components/Player";

function App() {
  const [playerA, setPlayerA] = useState<number>(0);
  const [playerB, setPlayerB] = useState<number>(0);

  return (
    <div>
      <h1>Gra dla dwóch graczy</h1>
      <Player 
        name="Gracz A" 
        score={playerA} 
        onAddPoint={() => setPlayerA(playerA + 1)} 
      />
      <Player 
        name="Gracz B" 
        score={playerB} 
        onAddPoint={() => setPlayerB(playerB + 1)} 
      />
      <button onClick={() => { setPlayerA(0); setPlayerB(0); }}>
        Reset obu
      </button>
    </div>
  );
}
export default App;