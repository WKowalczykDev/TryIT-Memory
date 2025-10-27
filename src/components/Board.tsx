import Card from "./Card";
import './../styles/Board.css'
import { useState } from "react";

interface BoardProps {
    cards: string[];
    level: "easy" | "medium" | "hard";
}

interface FlippedCard {
    index: number;
    value: string;
}

function Board({ cards, level }: BoardProps) {

    // stan przechowujący odwrócone karty - tablica obiektów FlippedCard
    const [pairCards, setPairCards] = useState<FlippedCard[]>([]);
    // stan przechowujący tymczasowo odwrócone karty - tablica obiektów FlippedCard
    const [flippedCards, setFlippedCards] = useState<FlippedCard[]>([]);
    // stan blokujący możliwość klikania w karty - przydaje się gdy dwie karty są odwrócone i czekamy aż się odwrócą z powrotem
    const [disabled, setDisabled] = useState(false);

    // funkcja obsługująca kliknięcie w kartę przeniesiona do Board z komponentu Card
    // potrzebujemy indexu i wartości karty, żeby wiedzieć którą kartę odwrócić i czy pasuje do innej odwróconej karty
    const handleCardClick = (index: number, value: string) => {
        // jeżeli disabled jest true to nic nie robimy
        if (disabled) return;
        // Ignorujemy kliknięcia w już odwrócone karty
        // sprawdzamy czy karta o danym indexie znajduje się w tablicy flippedCards lub pairCards
        if (flippedCards.find(myCard => myCard.index == index) || pairCards.find(myCard => myCard.index == index)) {
            return;
        }
        // plansza nie jest zablokowana, ani karta nie jest odwrócona - możemy ją odwrócić
        // tworzymy newFlippedCards, które jest kopią flippedCards z dodaną nową kartą
        const newFlippedCards = [...flippedCards, { index, value }];
        // dodajemy kartę do tablicy flippedCards
        setFlippedCards(newFlippedCards);

        // w useState aktualizacja stanu jest asynchroniczna, więc newFlippedCards może nie być jeszcze dostępne w następnym wierszu
        // dlatego używamy newFlippedCards do sprawdzenia czy są dwie odwrócone karty
        // length sprawdza ile elementów jest w tablicy, jeżeli są dwie to sprawdzamy czy pasują do siebie
        if (newFlippedCards.length === 2) {
            if (newFlippedCards[0].value === value) {
                // PARA ZNALEZIONA - dodajemy je do pairCards
                setPairCards([...pairCards, newFlippedCards[0], { index, value }]);
                // czyścimy flippedCards
                setFlippedCards([]);
            } else {
                // PARA NIE ZNALEZIONA - blokujemy planszę i po czasie 400ms odwracamy karty z powrotem
                setDisabled(true);
                setTimeout(() => {
                    setFlippedCards([]);
                    setDisabled(false);
                }, 400);
            }
        }

    };

    return (
        <div className={`board ${level}`}>
            {cards.map((card, index) => (
                <Card
                    key={index}
                    value={card}
                    // sprawdzamy czy index karty znajduje się w tablicy flippedCards lub pairCards - jeśli tak to znaczy, że karta jest odwrócona
                    // find zwraca pierwszy znaleziony element lub undefined jeśli nic nie znajdzie - dlatego sprawdzamy czy wynik jest prawdziwy (czyli karta jest odwrócona) i wtedy przekazujemy true do propsa flipped
                    flipped={(flippedCards.find((card) => card.index === index) ||
                        pairCards.find((card) => card.index === index)) ? true : false}
                    // przekazujemy funkcję handleCardClick do propsa onClickToBoard - dzięki temu w komponencie Card możemy wywołać tę funkcję
                    onClickToBoard={() => handleCardClick(index, card)}
                />
            ))}
        </div>
    );
}

export default Board;