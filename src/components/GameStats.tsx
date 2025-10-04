import React from 'react';

interface GameStatsProps {
    timer: number;
    pairsFound: number;
    totalPairs: number;
    isSelectDisabled: boolean;
}

const GameStats: React.FC<GameStatsProps> = ({ timer, pairsFound, totalPairs, isSelectDisabled }) => {
    return (
        <div className="game-stats">
            <div>Czas: {timer}s</div>
            <div>Pary: {pairsFound} / {totalPairs}</div>
            {isSelectDisabled ? <div>Gra w toku...</div> : <div>Gra zakończona!</div>}
        </div>
    );
};

export default GameStats;