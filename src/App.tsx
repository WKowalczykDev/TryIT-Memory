import './App.css'
import Board from "./components/Board";
import { useEffect, useState } from "react";
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
  const [isGameChangePossible, setIsGameChangePossible] = useState(true);

  const [newGameFlag, setNewGameFlag] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value as "easy" | "medium" | "hard");
    setCards(getBoard(e.target.value as "easy" | "medium" | "hard"));
  };

  useEffect(() => {
    const select = document.getElementById("levelChangeSelect") as HTMLSelectElement | null;
    if (select) {
      select.disabled = !isGameChangePossible;
    }
  }, [isGameChangePossible]);

  const getBoard = (level: "easy" | "medium" | "hard") => {
    let currentBoard;
    if (level === "easy") currentBoard = easyBoard;
    else if (level === "medium") currentBoard = mediumBoard;
    else currentBoard = hardBoard;

    return shuffleArray(currentBoard);
  }

  const [cards, setCards] = useState<string[]>(getBoard(level));

  useEffect(() => {
    // TASOWANIE KART PRZY NOWEJ GRZE, PO RESECIE POZIOMU I WYKONANIU KODU W BOARD.TSX
    if (!newGameFlag) {
      setCards(getBoard(level));
    }
  }, [newGameFlag]);

  return (
    <div className="app">
      <div className="controls">
        <label>
          Wybierz poziom:
          <select id='levelChangeSelect' value={level} onChange={handleChange}>
            <option value="easy">Łatwy</option>
            <option value="medium">Średni</option>
            <option value="hard">Trudny</option>
          </select>
        </label>
      </div>
      <Board cards={cards} level={level} setIsGameChangePossible={setIsGameChangePossible} newGameFlag={newGameFlag} setNewGameFlag={setNewGameFlag} />
      {/* zmiana flagi nowej gry po kliknięciu przycisku Nowa Gra */}
      <div className='newGame'>
        <button onClick={() => { setNewGameFlag(true) }}>Nowa Gra</button>
      </div>
    </div>
  );
}

export default App;