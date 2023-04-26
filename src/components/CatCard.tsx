import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardsArrayType } from './CardGrid';
import { useRef, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import { CSSTransition } from 'react-transition-group';
import '../styles/card.css';

type CatCardProps = {
  card: CardsArrayType;
};

export const CatCard: React.FC<CatCardProps> = ({ card: { img } }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(true);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card
      className="flippable-card-container"
      style={{ backgroundColor: 'transparent' }}
      onClick={handleClick}
    >
      <CSSTransition in={isFlipped} timeout={600} classNames="flip">
        <div className="card">
          <CardMedia className="card-back" component="img" image={`assets/cards/${img}.png`} />
          <CardContent className="card-front" />
        </div>
      </CSSTransition>
    </Card>
  );
};
