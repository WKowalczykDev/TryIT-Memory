import Card from "./Card";
import './../styles/Board.css'

function Board() {
  return (
    <div className="board">
      <h2>Plansza</h2>
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default Board;