import { useState } from "react";
import "./App.css";

function App() {
  const [points, setPoints] = useState(0);

  return (
    <div>
      <h1>Punkty: {points}</h1>
      <button onClick={() => setPoints(points + 1)}>+1</button>
      <button onClick={() => setPoints(0)}>Reset</button>
    </div>
  );
}
export default App;