import './App.css'
import Board from "./components/Board";
import { useEffect, useState } from "react";
import { easyBoard, mediumBoard, hardBoard } from "./assets/boards";
import { CARD_FLIP_DURATION } from './assets/constants';


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

  //ustawinie flagi blokującej selecta, aby nie dało się zmienić poziomu gry po odkryciu pierwszej karty
  const [isSelectDisabled, setIsSelectDisabled] = useState<boolean>(false);

  // stan przechowujący informację o stanie gry - czy gra jest w toku czy zakończona
  const [gameState, setGameState] = useState(false); // true - gra w toku, false - gra zakończona

  // stan przechowujący informację czy reset został wywołany
  const [resetTriggered, setResetTriggered] = useState(false);

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

  //ustawienie atrybutu disabled w select - jeżeli isSelectDisabled jest true to select jest zablokowany
  //jeżeli false to select jest odblokowany
  // Ustawiamy atrybut disabled w useEffect, aby uniknąć błędów kompilacji
  useEffect(() => {
    // pobieramy element select po id i nadajemy mu typ HTMLSelectElement lub null (jeżeli nie znajdzie elementu)
    const select = document.getElementById("levelChangeSelect") as HTMLSelectElement | null;
    if (select) {
      select.disabled = isSelectDisabled;
    }
  }, [isSelectDisabled]);

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
      <Board cards={shuffledCards} level={level} selectDisabled={setIsSelectDisabled} gameState={gameState} setGameState={setGameState} resetTriggered={resetTriggered} setResetTriggered={setResetTriggered} />
      <div className='restart'>
        <button onClick={() => {
          setResetTriggered(true);
          setIsSelectDisabled(false);
          setTimeout(() => {
            setShuffledCards(shuffleArray(getBoard(level)));
          }, CARD_FLIP_DURATION);
        }}>Wyczyść planszę</button>
      </div>
    </div>
  );
}

export default App;
