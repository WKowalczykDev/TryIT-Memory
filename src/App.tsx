import { useState } from "react";
import "./App.css";

import ScoreDisplay from "./components/ScoreDisplay";
import ActionButton from "./components/ActionButton";

function App() {
  const [points, setPoints] = useState(0);

  return (
    <div>
      <ScoreDisplay points={points} />
      <ActionButton onClick={() => setPoints(points + 10)} label="+10" />
      <ActionButton onClick={() => setPoints(points - 5)} label="-5" />
      <ActionButton onClick={() => setPoints(0)} label="Reset" />
    </div>
  );
}
export default App;