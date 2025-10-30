import './../styles/Card.css'
import { imageMap, colorMap } from '../assets/images';
import { useEffect, useState } from 'react';

interface CardProps {
  value: string;
  flipped: boolean;
  onClickToBoard: () => void;
}

function Card({ value, flipped, onClickToBoard }: CardProps) {

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // ustaw obrazek na podstawie value
  useEffect(() => {
    if (imageMap[value]) {
      setImageSrc(imageMap[value]);
    } else {
      setImageSrc(null);
    }
  }, [value]);

  const cardFront = imageMap['front'];
  const cardColor = colorMap[value] || 'lightgray';
  
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onClickToBoard}>
      <div className='card-inner'>
        <div className='card-front'>
          <img src={cardFront} alt="Awers karty" />
        </div>

        <div className='card-back' style={{ backgroundColor: cardColor }}>
          {imageSrc ? (
            <img src={imageSrc} alt={`Karta ${value}`} className="card-image" />
          ) : (
            <span>{value}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;