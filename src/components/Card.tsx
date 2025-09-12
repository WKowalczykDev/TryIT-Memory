import './../styles/Card.css'

// Interfejs w TypeScript definiuje **strukturę obiektu**, czyli jakie właściwości i ich typy powinien mieć.
// W tym przypadku CardProps mówi, że komponent Card musi otrzymać właściwość `value` typu string.
// Dzięki temu TypeScript może sprawdzić poprawność użycia komponentu już podczas pisania kodu.
interface CardProps {
  value: string;
  flipped: boolean;
  myOnClick: () => void;
}

function Card({ value, flipped ,myOnClick }: CardProps) {

  return (
    // używamy shortif -> czyli jeżeli flipped jest prawdą -> klasa będzie się nazywała 'card flipped', jeżeli będzie false -> klasa będzie się nazywała 'card'
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
    // onClick przypisujemy do diva - dzięki temu gdy klikniemy w kartę wywoła się funkcja myOnClick, którą przekazaliśmy z Board.tsx
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={myOnClick}>
      <div className='card-inner'>
        <div className='card-front'>?</div>
        <div className='card-back'>{value}</div>
      </div>
    </div>
  );
}

export default Card;
