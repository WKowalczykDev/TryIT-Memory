import './../styles/Card.css'
import { useState } from "react";

// Interfejs w TypeScript definiuje **strukturę obiektu**, czyli jakie właściwości i ich typy powinien mieć.
// W tym przypadku CardProps mówi, że komponent Card musi otrzymać właściwość `value` typu string.
// Dzięki temu TypeScript może sprawdzić poprawność użycia komponentu już podczas pisania kodu.
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
