import './../styles/Card.css'

// Interfejs w TypeScript definiuje **strukturę obiektu**, czyli jakie właściwości i ich typy powinien mieć.
// W tym przypadku CardProps mówi, że komponent Card musi otrzymać właściwość `value` typu string.
// Dzięki temu TypeScript może sprawdzić poprawność użycia komponentu już podczas pisania kodu.
interface CardProps {
  value: string;
}

function Card({value} : CardProps) {
  return <div className='card'>{value}</div>;
}

export default Card;