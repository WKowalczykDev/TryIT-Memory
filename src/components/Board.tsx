import Card from "./Card";
import './../styles/Board.css'
import { easyBoard,mediumBoard,hardBoard } from "../assets/boards";

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

function Board() {
  // Wywołanie funkcji shuffleArray i przypisanie wyniku do stałej shuffledCards
    const shuffledCards = shuffleArray(mediumBoard);

    return (
        <div className="board">
            {/* Tworzenie 'mapy', czyli "bierz każdy element tablicy i przetwórz go na coś nowego"*/}
            {shuffledCards.map((card, index) => (
                // index jest każdą kolejną iteracją tablicy - React potrzebuje rozróżnienia pomiędzy kolejnymi elementami, dlatego w komponencie Card umiesczamy klucz=index
                // card jest właśnie wartością, która znajduje się w tablicy boards.ts
                // dla ciekawskich: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
                <Card key={index} value={card} />
            ))}
        </div>
    );
}

export default Board;