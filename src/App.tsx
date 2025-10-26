import './App.css'
import Board from "./components/Board";
import { useState } from "react";
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
  const [level, setLevel] = useState<"easy" | "medium" | "hard">('easy');


  // handleChange to funkcja która obsługuje zmianę w <select>
  // e.target.value to jest jedna z wartości z <select> -> np. <option value="easy">Łatwy</option>
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value as "easy" | "medium" | "hard");
    setCards(getBoard(e.target.value as "easy" | "medium" | "hard"));
  };

  // wybieramy odpowiednią tablicę z listy i zapisujemy ją do zmiennej currentBoard, która później tworzy na jej podstawie pomieszane <Board>
  const getBoard = (level: "easy" | "medium" | "hard") => {
    let currentBoard;
    if (level === "easy") currentBoard = easyBoard;
    else if (level === "medium") currentBoard = mediumBoard;
    else currentBoard = hardBoard;

    return shuffleArray(currentBoard);
  }

  // cards przechowuje aktualną tablicę kart na planszy - domyślnie jest to tablica dla poziomu level
  // setCards to funkcja, która pozwala nam zmienić tablicę kart na planszy
  const [cards, setCards] = useState<string[]>(getBoard(level));


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
      <Board cards={cards} level={level} />
    </div>
  );
}

export default App;