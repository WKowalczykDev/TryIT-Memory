import Card from "./Card";
import './../styles/Board.css'
import { useEffect, useState } from "react";
import GameStats from "./GameStats";
import { CARD_FLIP_DURATION } from "../assets/constants";
import GameCookies from "./GameCookies";

// dodajemy interfejs na takiej samej zasadzie jak w Card.tsx
interface BoardProps {
    cards: string[];
    level: "easy" | "medium" | "hard";
    selectDisabled: (value: boolean) => void;
    gameState: boolean;
    setGameState: (value: boolean) => void;
    resetTriggered: boolean;
    setResetTriggered: (value: boolean) => void;
}

interface FlippedCard {
    index: number;
    value: string;
}

function Board({ cards, level, selectDisabled, gameState, setGameState, resetTriggered, setResetTriggered }: BoardProps) {

    // stan przechowujący odwrócone karty - tablica obiektów FlippedCard
    const [pairCards, setPairCards] = useState<FlippedCard[]>([]);
    // stan przechowujący tymczasowo odwrócone karty - tablica obiektów FlippedCard
    const [flippedCards, setFlippedCards] = useState<FlippedCard[]>([]);
    // stan blokujący możliwość klikania w karty - przydaje się gdy dwie karty są odwrócone i czekamy aż się odwrócą z powrotem
    const [disabled, setDisabled] = useState(false);
    // stan przechowujący czas gry
    const [timer, setTimer] = useState(0);
    // stan przechowujący informację czy licznik czasu jest aktywny
    const [isTimerActive, setIsTimerActive] = useState(false);
    // stan przechowujący liczbę kroków
    const [steps, setSteps] = useState(0);
    // stan przechowujący czy gra została wygrana, nie tylko zakończona - do przekazania do GameCookies
    const [countGameWon, setCountGameWon] = useState(0);

    useEffect(() => {
        // jeżeli długość pairCards jest równa długości cards to znaczy, że wszystkie karty zostały odkryte
        // KONIEC GRY - WYGRANA
        if (pairCards.length === cards.length) {
            setIsTimerActive(false); // zatrzymujemy licznik czasu
            setGameState(false); // ustawiamy stan gry na false - gra zakończona

            //WYWOŁUJEMY FUNKCJĘ POZWALAJĄCĄ ZAPISAĆ WYNIK W PLIKACH COOKIES
            setCountGameWon(countGameWon + 1); // zwiększamy licznik wygranych gier o 1
        }
    }, [pairCards]);

    // jeżeli gameState (czyli isSelectDisabled z App.tsx) zmieni się na false (czyli odblokujemy możliwość zmiany poziomu gry) to czyścimy stany flippedCards i pairCards oraz odblokowujemy możliwość klikania w karty

    useEffect(() => {
        // zmienna do przechowywania ID interwału
        let interval: number | undefined;
        //KONIEC GRY - reset, po odblokowaniu możliwości zmiany poziomu gry
        if (resetTriggered) {
            setFlippedCards([]);
            setPairCards([]);
            setDisabled(false);
            setTimer(0); // resetujemy licznik czasu
            setSteps(0); // resetujemy liczbę kroków
            selectDisabled(false); // odblokowujemy możliwość zmiany poziomu gry
            setResetTriggered(false); // resetujemy flagę resetTriggered w App.tsx
            setIsTimerActive(false); // zatrzymujemy licznik czasu
        }
        //START GRY - start licznika czasu
        else {
            //co 100ms update'ujemy stan licznika o 100ms
            if (isTimerActive) {
                interval = setInterval(() => {
                    setTimer((prevTimer) => Number((prevTimer + 0.1).toFixed(1)));
                }, 100);
            }
        }
        // funkcja sprzątająca - wywoływana przy odmontowaniu komponentu lub zmianie gameState lub isTimerActive
        // cleanup działa tak, że najpierw wywołuje funkcję cleanup z poprzedniego renderu, a potem wykonuje kod w useEffect
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [resetTriggered, isTimerActive]);

    // funkcja obsługująca kliknięcie w kartę
    const handleCardClick = (index: number, value: string) => {
        // jeżeli disabled jest true to nic nie robimy
        if (disabled) return;
        // jeżeli karta jest już w flippedCards lub pairCards to nic nie robimy
        if (flippedCards.find(myCard => myCard.index == index) || pairCards.find(myCard => myCard.index == index)) {
            return;
        }
        // URUCHAMIAMY TIMER PRZY PIERWSZYM KLIKNIĘCIU
        if (!isTimerActive) {
            setTimer(0);
            setIsTimerActive(true);
        }

        if (!gameState) {
            setGameState(true); // ustawiamy stan gry na true - gra w toku
        }

        // dodajemy klikniętą kartę do flippedCards
        // tworzymy nową tablicę z poprzednimi odwróconymi kartami oraz z nową kartą
        // dzięki temu React "zauważy" zmianę w stanie i przerysuje komponent
        // nie możemy robić flippedCards.push() ponieważ wtedy zmieniamy bezpośrednio tablicę w useState i React tego nie zauważy
        const newFlippedCards = [...flippedCards, { index, value }]
        setFlippedCards(newFlippedCards)
        setSteps(steps + 1); // zwiększamy liczbę kroków o 1
        selectDisabled(true); // blokujemy możliwość zmiany poziomu gry po odkryciu pierwszej karty

        if (flippedCards.length > 0) {
            if (flippedCards[0].value === value) {
                // gdy karty się zgadzają dodajemy do useState pairCards, żeby mieć miejce gdzie będziemy przechowywać stale odkryte karty
                // dodajemy do pary pierwszą kartę z flippedCards oraz drugą kartę, którą właśnie kliknęliśmy
                setPairCards([...pairCards, flippedCards[0], { index, value }]);
                setFlippedCards([]);
            }
            else {
                // co zrobić gdy karty się nie zgadzają
                setDisabled(true); // blokujemy możliwość klikania w karty za pomocą stanu disabled w useState
                // po 0.4 sekundy odkrywamy karty z powrotem
                setTimeout(() => {
                    // czyscimy flippedCards - aby karty się odwróciły z powrotem
                    setFlippedCards([]);
                    // odblokowujemy możliwość klikania w karty
                    setDisabled(false);
                }, CARD_FLIP_DURATION);
            }
            return
        }
    };

    return (
        <div className='game-container'>
            <GameStats timer={timer} steps={steps} pairsFound={pairCards.length / 2} totalPairs={cards.length / 2} gameState={gameState} />
            <div className={`board ${level}`}>
                {/* Tworzenie 'mapy', czyli "bierz każdy element tablicy i przetwórz go na coś nowego"*/}
                {cards.map((card, index) => (
                    // index jest każdą kolejną iteracją tablicy - React potrzebuje rozróżnienia pomiędzy kolejnymi elementami, dlatego w komponencie Card umiesczamy klucz=index
                    // card jest właśnie wartością, która znajduje się w tablicy boards.ts
                    // dla ciekawskich: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
                    <Card
                        key={index}
                        value={card}
                        // sprawdzamy czy index karty znajduje się w tablicy flippedCards lub pairCards - jeśli tak to znaczy, że karta jest odwrócona
                        // find zwraca pierwszy znaleziony element lub undefined jeśli nic nie znajdzie - dlatego sprawdzamy czy wynik jest prawdziwy (czyli karta jest odwrócona) i wtedy przekazujemy true do propsa flipped
                        flipped={(flippedCards.find((flippedCard) => flippedCard.index === index) ||
                            pairCards.find((pairCard) => pairCard.index === index)) ? true : false}
                        // przekazujemy funkcję handleCardClick do propsa myOnClick - dzięki temu w komponencie Card możemy wywołać tę funkcję
                        myOnClick={() => handleCardClick(index, card)}
                    />
                ))}
            </div>
            <GameCookies gameWonCount={countGameWon} newGameDetector={gameState}/>
        </div>
    );
}

export default Board;
