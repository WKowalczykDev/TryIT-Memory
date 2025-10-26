import Card from "./Card";
import './../styles/Board.css'

interface BoardProps {
  cards: string[];
  level: "easy" | "medium" | "hard";
}

function Board({cards, level} : BoardProps) {

    return (
        <div className={`board ${level}`}>
            {cards.map((card, index) => (
                <Card key={index} value={card} />
            ))}
        </div>
    );
}

export default Board;