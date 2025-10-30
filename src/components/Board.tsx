import Card from "./Card";
import './../styles/Board.css'
import { useEffect, useState } from "react";
import { CARD_FLIP_DURATION } from "../assets/constants";
import GameStats from "./GameStats";

interface BoardProps {
    cards: string[];
    level: "easy" | "medium" | "hard";
    setIsGameChangePossible: (value: boolean) => void;
    newGameFlag: boolean;
    setNewGameFlag: (value: boolean) => void;
}

interface FlippedCard {
    index: number;
    value: string;
}

function Board({ cards, level, setIsGameChangePossible, newGameFlag, setNewGameFlag }: BoardProps) {

    const [pairCards, setPairCards] = useState<FlippedCard[]>([]);
    const [flippedCards, setFlippedCards] = useState<FlippedCard[]>([]);
    const [disabled, setDisabled] = useState(false);
    const [gameState, setGameState] = useState<boolean | undefined>(undefined);
    const [timer, setTimer] = useState<number>(0);
    const [timerID, setTimerID] = useState<number | undefined>(undefined);
    const [steps, setSteps] = useState<number>(0);

    const handleGameStart = () => {
        setIsGameChangePossible(false);
        setTimer(0);
        setSteps(0);
        setGameState(true);
        startTimer();
    }

    const handleCardClick = (index: number, value: string) => {

        if (disabled) return;
        if (flippedCards.find(myCard => myCard.index == index) || pairCards.find(myCard => myCard.index == index)) {
            return;
        }

        // DETEKCJA ROZPOCZĘCIA GRY
        if (flippedCards.length === 0 && pairCards.length === 0 && timer === 0) {
            handleGameStart();
        }

        // ROZGRYWKA - ODWRACANIE KART
        const newFlippedCards = [...flippedCards, { index, value }];
        setFlippedCards(newFlippedCards);
        setSteps(nOSteps => nOSteps + 1);


        if (newFlippedCards.length === 2) {
            if (newFlippedCards[0].value === value) {
                // PARA ZNALEZIONA
                setPairCards([...pairCards, newFlippedCards[0], { index, value }]);
                setFlippedCards([]);
            } else {
                // PARA NIE ZNALEZIONA
                setDisabled(true);
                setTimeout(() => {
                    setFlippedCards([]);
                    setDisabled(false);
                }, CARD_FLIP_DURATION);
            }
        }

    };

    const gameWonDetected = () => {
        // ZATRZYMANIE LICZNIKA CZASU GRY PO WYGRANIU
        stopTimer();
        setGameState(false);
    }

    useEffect(() => {
        // DETEKCJA WYGRANIA GRY
        if (pairCards.length === cards.length && cards.length > 0) {
            gameWonDetected();
        }
    }, [pairCards]);

    const resetGame = () => {
        setGameState(undefined);
        // ZAKRYCIE KART
        setPairCards([]);
        setFlippedCards([]);
        // STOPOWANIE I ZEROWANIE LICZNIKA CZASU GRY I LICZNIKA RUCHÓW
        stopTimer();
        setTimer(0);
        setSteps(0);
        // ODBLOKOWANIE MOŻLIWOŚCI KLIKANIA PO ODWRÓCENIU KART
        setTimeout(() => {
            setNewGameFlag(false);
            setDisabled(false);
            setIsGameChangePossible(true);
        }, CARD_FLIP_DURATION)
    }

    useEffect(() => {
        // RESET GRY
        if (newGameFlag) {
            resetGame();
        }
    }, [newGameFlag]);


    const startTimer = () => {
        if (timerID) return;
        setTimerID(setInterval(() => {
            setTimer(prevTimer => {
                return prevTimer + 0.1;
            });
        }, 100));
    }

    const stopTimer = () => {
        if (timerID) {
            clearInterval(timerID);
            setTimerID(undefined);
        }
    }

    return (
        <div className="game-container">
            <GameStats timer={timer} steps={steps} pairsFound={pairCards.length / 2} totalPairs={cards.length / 2} gameState={gameState} />
            <div className={`board ${level}`}>
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        value={card}
                        flipped={(flippedCards.find((card) => card.index === index) ||
                            pairCards.find((card) => card.index === index)) ? true : false}
                        onClickToBoard={() => handleCardClick(index, card)}
                    />
                ))}
            </div>
            <div className="game-scores"></div>
        </div>
    );
}

export default Board;