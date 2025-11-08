interface ScoreDisplayProps {
  points: number;
}

function ScoreDisplay({ points }: ScoreDisplayProps) {
  return <h2>Wynik: {points}</h2>;
}

export default ScoreDisplay ;