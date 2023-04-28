import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../styles/card.css';
import { CardsArrayType, useMemoryCatContext } from '../context/memoryCatContext';

type CatCardProps = {
  index: number;
  card: CardsArrayType;
};

export const CatCard: React.FC<CatCardProps> = ({ index, card }) => {
  const { dispatchMemoryCat } = useMemoryCatContext();
  const { id, imgId, guessed, flipped } = card;
  const nodeRef = useRef(null);

  function throttle(func: any, limit: number) {
    let lastFunc: ReturnType<typeof setTimeout> | null;
    let lastRan: number | null;

    return (...args: any[]): void => {
      if (!lastRan) {
        func(...args);
        lastRan = Date.now();
      } else {
        if (lastFunc) clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - (lastRan as number) >= limit) {
            func(...args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - (lastRan as number)));
      }
    };
  }

  const flipCard = () => {
    if (!guessed) {
      if (!flipped) {
        dispatchMemoryCat({
          type: 'FLIP_CARD',
          payload: { index, id },
        });
      }
    }
  };

  const throttledFlipCard = throttle(flipCard, 500);

  return (
    <Card
      className={`flippable-card-container ${guessed ? '' : 'cursor-pointer'}`}
      style={{ backgroundColor: 'transparent' }}
      onClick={throttledFlipCard}
    >
      <CSSTransition nodeRef={nodeRef} in={!flipped} timeout={600} classNames="flip">
        <div ref={nodeRef} className="card">
          <CardMedia className="card-back" component="img" image="assets/catBack.png" />
          <CardMedia className="card-front" component="img" image={`assets/cards/${imgId}.png`} />
        </div>
      </CSSTransition>
    </Card>
  );
};
