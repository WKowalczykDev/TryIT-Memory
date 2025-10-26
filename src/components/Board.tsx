import Card from "./Card";
import './../styles/Board.css'

interface BoardProps {
  cards: string[];
  level: "easy" | "medium" | "hard";
}

function Board({cards, level} : BoardProps) {
  // Wywołanie funkcji shuffleArray i przypisanie wyniku do stałej shuffledCards

    return (
        <div className={`board ${level}`}>
            {/* Tworzenie 'mapy', czyli "bierz każdy element tablicy i przetwórz go na coś nowego"*/}
            {cards.map((card, index) => (
                // index jest każdą kolejną iteracją tablicy - React potrzebuje rozróżnienia pomiędzy kolejnymi elementami, dlatego w komponencie Card umieszcamy klucz=index
                // card jest właśnie wartością, która znajduje się w tablicy boards.ts
                // dla ciekawskich: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
                <Card key={index} value={card} />
            ))}
        </div>
    );
}

export default Board;