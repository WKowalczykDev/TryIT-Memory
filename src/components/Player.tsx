interface PlayerProps {
  name: string;
  score: number;
  onAddPoint: () => void;
}

export default function Player({ name, score, onAddPoint }: PlayerProps) {
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "5px" }}>
      <h3>{name}</h3>
      <p>Punkty: {score}</p>
      <button onClick={onAddPoint}>Zdobądź punkt</button>
    </div>
  );
}