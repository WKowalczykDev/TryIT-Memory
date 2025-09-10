import './App.css'
import Board from "./components/Board";
// Dodajemy useState
import { useState } from "react";
import { easyBoard, mediumBoard, hardBoard } from "./assets/boards";

function App() {

  // useState pozwala "zapamiętać" dane wewnątrz komponentu - wybrany poziom gry
  // level przechowuje nam aktualną wybraną wartość stanu - defaultowo jest easy
  // setLevel - to funkcja, która pozwala nam zmienić warość level
  const [level, setLevel] = useState<"easy" | "medium" | "hard">("easy");


  // handleChange to funkcja która obsługuje zmianę w <select>
  // e.target.value to jest jedna z wartości z <select> -> np. <option value="easy">Łatwy</option>
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value as "easy" | "medium" | "hard");
  };

  // wybieramy odpowiednią tablicę z listy i zapisujemy ją do zmiennej currentBoard, która później tworzy na jej podstawie <Board>
  let currentBoard;
  if (level === "easy") currentBoard = easyBoard;
  else if (level === "medium") currentBoard = mediumBoard;
  else currentBoard = hardBoard;

  return (
    <div className="app">
      {/* "pojemnik" z wyborem trudności poziomu */}
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
      {/* plansza Board */}
      <Board cards={currentBoard} level={level} />
    </div>
  );
}

export default App;
