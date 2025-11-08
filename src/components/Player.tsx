import { useEffect } from "react";

interface PlayerProps {
    name: string;
    score: number;
    onAddPoint: () => void;
}

export default function Player({ name, score, onAddPoint }: PlayerProps) {
    useEffect(() => {
        console.log(`${name} ma teraz ${score} punktów.`);
        if (score >= 10) {
            alert(`${name} wygrał grę!`);
        }
    }, [score]);

    return (
        <div style={{ border: "1px solid black", padding: "10px", margin: "5px" }}>
            <h3>{name}</h3>
            <p>Punkty: {score}</p>
            <button onClick={onAddPoint}>Zdobądź punkt</button>
        </div>
    );
}