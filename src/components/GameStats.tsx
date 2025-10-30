
interface GameStatsProps {
    timer: number;
    steps: number;
    pairsFound: number;
    totalPairs: number;
    gameState: boolean | undefined;
}

function GameStats({ timer, steps, pairsFound, totalPairs, gameState }: GameStatsProps) {
    return (<div className="game-stats">
        <div>Czas: {timer.toFixed(1)}s</div>
        <div>Kroki: {steps}</div>
        <div>Pary: {pairsFound} / {totalPairs}</div>
        {gameState === undefined ? <div>Rozpocznij grę!</div> : gameState ? <div>Gra w toku...</div> : <div>Gra zakończona!</div>}
    </div>);
}

export default GameStats;