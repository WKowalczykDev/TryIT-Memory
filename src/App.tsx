import './App.css'
import Board from "./components/Board";
import { useEffect, useState } from "react";
import { easyBoard, mediumBoard, hardBoard } from "./assets/boards";


// funkcja tasowania tablicy - zmiana aby nie była posortowana
function shuffleArray(array: string[]) {
  const newArray = []; // nowa tablica, w której będziemy umieszczać potasowany układ
  const copy = [...array]; // kopiujemy oryginalną tablicę

  while (copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length); // losowy indeks - Math.random() wybiera losową liczbę od 0 do 1, Math.floor przybliża do najbliższej liczby całkowitej; copy.length to długość tablicy, którą tasujemy
    newArray.push(copy[index]); // dodajemy element do nowej tablicy
    copy.splice(index, 1); // usuwamy element z kopii zmniejszając jej wielkość - przechodzimy na początek pętli while
  }

  return newArray;
}

function App() {

  // useState pozwala "zapamiętać" dane wewnątrz komponentu - wybrany poziom gry
  // level przechowuje nam aktualną wybraną wartość stanu - defaultowo jest easy
  // setLevel - to funkcja, która pozwala nam zmienić warość level
  const [level, setLevel] = useState<"easy" | "medium" | "hard">("easy");
  // stan przechowujący potasowane karty - defaultowo potasowane easyBoard
  const [shuffledCards, setShuffledCards] = useState<string[]>(shuffleArray(easyBoard));

  // wybieramy odpowiednią tablicę z listy i zapisujemy ją do zmiennej currentBoard, która później tworzy na jej podstawie <Board>
  const getBoard = (level: "easy" | "medium" | "hard") => {
    let currentBoard;
    if (level === "easy") currentBoard = easyBoard;
    else if (level === "medium") currentBoard = mediumBoard;
    else currentBoard = hardBoard;

    return currentBoard;
  }

  // useEffect pozwala wykonać jakąś akcję w momencie zmiany stanu lub załadowania komponentu
  // w tym przypadku za każdym razem, gdy zmieni się level (czyli wybierzemy inny poziom trudności) to wywoła się funkcja, która ustawi potasowane karty dla danego poziomu
  // dzięki temu nie musimy ręcznie, w funkcji handleChange tasować kart przy każdej zmianie poziomu - robi to za nas useEffect
  useEffect(() => {
    const newBoard = getBoard(level);
    setShuffledCards(shuffleArray(newBoard));
  }, [level]) // <- tutaj podajemy od czego zależy useEffect - czyli kiedy ma się wykonać - w tym przypadku za każdym razem, gdy zmieni się level

  // handleChange to funkcja która obsługuje zmianę w <select>
  // e.target.value to jest jedna z wartości z <select> -> np. <option value="easy">Łatwy</option>
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value as "easy" | "medium" | "hard");
  };

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
      <Board cards={shuffledCards} level={level} />
    </div>
  );
}

export default App;
