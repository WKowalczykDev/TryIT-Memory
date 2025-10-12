import './../styles/Card.css'
import cardFront from '../assets/images/card-front.png'
import { useEffect, useState } from "react";

// Interfejs w TypeScript definiuje **strukturę obiektu**, czyli jakie właściwości i ich typy powinien mieć.
// W tym przypadku CardProps mówi, że komponent Card musi otrzymać właściwość `value` typu string.
// Dzięki temu TypeScript może sprawdzić poprawność użycia komponentu już podczas pisania kodu.
interface CardProps {
  value: string;
  flipped: boolean;
  myOnClick: () => void;
}

function Card({ value, flipped, myOnClick }: CardProps) {

  // stan przechowujący ścieżkę do obrazka - defaultowo null
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // definiujemy kolory w obiekcie, aby łatwiej było nimi zarządzać
  const c = {
    yellow:'#fad50a',
    red:'#f2433a',
    green:'#8ebf04',
    purple:'#7b3d72',
    orange:'#f78d0f'
  }

  // mapa kolorów dla wartości kart
  // używamy Record<string, string> aby określić, że klucze i wartości są typu string
  const cardColors: Record<string, string> = {
    'A': c.yellow,
    'B': c.red,
    'C': c.green,
    'D': c.purple,
    'E': c.yellow,
    'F': c.red,
    'G': c.green,
    'H': c.orange,
    'I': c.yellow,
    'J': c.red,
    'K': c.green,
    'L': c.purple,
    'M': c.yellow,
    'N': c.red,
    'O': c.green,
    'P': c.orange,
    'Q': c.red,
    'R': c.green,
    'S': c.red,
    'T': c.green,
  };

  useEffect(() => {
    // Dynamicznie importuj obrazek na podstawie wartości
    const loadImage = async () => {
      try {
        const image = await import(`../assets/images/${value}.png`);
        setImageSrc(image.default);
      } catch (error) {
        console.error(`Nie można załadować obrazka: ${value}.png`, error);
        setImageSrc(null); // imageSrc ustaw na null, jeśli obrazek nie istnieje
      }
    };

    loadImage();
  }, [value]);
  return (
    // używamy shortif -> czyli jeżeli flipped jest prawdą -> klasa będzie się nazywała 'card flipped', jeżeli będzie false -> klasa będzie się nazywała 'card'
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
    // onClick przypisujemy do diva - dzięki temu gdy klikniemy w kartę wywoła się funkcja myOnClick, którą przekazaliśmy z Board.tsx
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={myOnClick}>
      <div className='card-inner'>
        <div className='card-front'>
          <img src={cardFront} alt="Awers karty" />
        </div>
        {/* Importuj obrazek z dynamicznej ścieżki, jeżeli nie jest dostępny to wypisz wartość alternatywną */}
        <div className='card-back' style={{ backgroundColor: cardColors[value] || 'lightgray' }}>{
          imageSrc ?
            (<img src={imageSrc} alt={`Karta ${value}`} className="card-image" />)
            :
            (<span>{value}</span>)
        }</div>
      </div>
    </div>
  );
}

export default Card;
