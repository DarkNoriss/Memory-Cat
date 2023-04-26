import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardsArrayType } from './CardGrid';
import { useRef, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import { CSSTransition } from 'react-transition-group';
import '../styles/card.css';

type CatCardProps = {
  index: number;
  card: CardsArrayType;
};

export const CatCard: React.FC<CatCardProps> = ({ index, card }) => {
  const { imgId, guessed } = card;
  const [isFlipped, setIsFlipped] = useState<boolean>(true);
  const nodeRef = useRef(null);

  const handleClick = () => {
    if (true) setIsFlipped(!isFlipped);
  };

  return (
    <Card
      className="flippable-card-container"
      style={{ backgroundColor: 'transparent' }}
      onClick={handleClick}
    >
      <CSSTransition nodeRef={nodeRef} in={isFlipped} timeout={600} classNames="flip">
        <div ref={nodeRef} className={`card ${guessed ? '' : 'cursor-pointer'} `}>
          <CardMedia className="card-back" component="img" image={`assets/cards/${imgId}.png`} />
          <CardContent className="card-front" />
        </div>
      </CSSTransition>
    </Card>
  );
};
