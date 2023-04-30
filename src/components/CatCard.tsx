import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMemoryCatContext } from '../context/memoryCatContext';
import { CardsArrayType } from '../types/CatTypes';
import '../styles/card.css';

type CatCardProps = {
  index: number;
  card: CardsArrayType;
};

export const CatCard: React.FC<CatCardProps> = ({ index, card }) => {
  const { dispatchMemoryCat } = useMemoryCatContext();
  const { id, imgId, guessed, flipped } = card;
  const nodeRef = useRef(null);

  const flipCard = () => {
    if (!guessed && !flipped) {
      dispatchMemoryCat({
        type: 'FLIP_CARD',
        payload: { index, id },
      });
    }
  };

  return (
    <Card
      className={`flippable-card-container ${guessed ? '' : 'cursor-pointer'}`}
      style={{ backgroundColor: 'transparent' }}
      onClick={flipCard}
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
