import React from 'react';
import '../styles/GameStats.css';

interface GameStatsProps {
    timer: number;
    steps:number;
    pairsFound: number;
    totalPairs: number;
    gameState: boolean;
}

const GameStats: React.FC<GameStatsProps> = ({ timer, steps, pairsFound, totalPairs, gameState }) => {
    return (
        <div className="game-stats">
            <div>Czas: {timer}s</div>
            <div>Kroki: {steps}</div>
            <div>Pary: {pairsFound} / {totalPairs}</div>
            {gameState ? <div>Gra w toku...</div> : <div>Gra zakończona!</div>}
            <div><p>wyczyść planszę aby odblokować możliwość zmiany poziomu gry</p></div>
        </div>
    );
};

export default GameStats;