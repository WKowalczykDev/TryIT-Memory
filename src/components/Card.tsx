import './../styles/Card.css'
import {useState} from "react";

interface CardProps {
  value: string;
}

function Card({value} : CardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    // używamy shortif -> czyli jeżeli flipped jest prawdą -> klasa będzie się nazywała 'card flipped', jeżeli będzie false -> klasa będzie się nazywała 'card'
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className='card-inner'>
        <div className='card-front'>?</div>
        <div className='card-back'>{value}</div>
      </div>
    </div>
  );
}

export default Card;