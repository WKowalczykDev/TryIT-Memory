import Card from "./Card";
import './../styles/Board.css'
import { useEffect, useState } from "react";

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

function Board({ cards, level, setIsGameChangePossible }: BoardProps) {

    const [pairCards, setPairCards] = useState<FlippedCard[]>([]);
    const [flippedCards, setFlippedCards] = useState<FlippedCard[]>([]);
    const [disabled, setDisabled] = useState(false);

    const handleGameStart = () => {
        setIsGameChangePossible(false);
    }

    const handleCardClick = (index: number, value: string) => {

        if (disabled) return;
        if (flippedCards.find(myCard => myCard.index == index) || pairCards.find(myCard => myCard.index == index)) {
            return;
        }

        // DETEKCJA ROZPOCZĘCIA GRY
        if (flippedCards.length === 0 && pairCards.length === 0) {
            handleGameStart();
        }

        // ROZGRYWKA - ODWRACANIE KART
        const newFlippedCards = [...flippedCards, { index, value }];
        setFlippedCards(newFlippedCards);


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
                }, 400);
            }
        }

    };

    const gameWonDetected = () => {
        console.log("GRA WYGRANA!");
        alert("Gratulacje! Wygrałaś/eś grę!");
    }

    useEffect(() => {
        // DETEKCJA WYGRANIA GRY
        if (pairCards.length === cards.length && cards.length > 0) {
            gameWonDetected();
        }
    }, [pairCards]);

    return (
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
    );
}

export default Board;