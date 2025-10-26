import './App.css'
import Board from "./components/Board";
import { useState } from "react";
import { easyBoard, mediumBoard, hardBoard } from "./assets/boards";


// funkcja tasowania tablicy - zmiana aby nie była posortowana
function shuffleArray(array: string[]) {
    const newArray = [];
    const copy = [...array];

    while (copy.length > 0) {
        const index = Math.floor(Math.random() * copy.length); 
        newArray.push(copy[index]);
        copy.splice(index, 1);
    }

    return newArray;
}

function App() {

  const [level, setLevel] = useState<"easy" | "medium" | "hard">('easy');


 const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value as "easy" | "medium" | "hard");
    setCards(getBoard(e.target.value as "easy" | "medium" | "hard"));
  };

  const getBoard = (level: "easy" | "medium" | "hard") => {
    let currentBoard;
    if (level === "easy") currentBoard = easyBoard;
    else if (level === "medium") currentBoard = mediumBoard;
    else currentBoard = hardBoard;

    return shuffleArray(currentBoard);
  }

  const [cards, setCards] = useState<string[]>(getBoard(level));


  return (
    <div className="app">
      <div className="controls">
        <label>
          Wybierz poziom:
          <select value={level} onChange={handleChange}>
            <option value="easy">Łatwy</option>
            <option value="medium">Średni</option>
            <option value="hard">Trudny</option>
          </select>
        </label>
      </div>
      <Board cards={cards} level={level} />
    </div>
  );
}

export default App;