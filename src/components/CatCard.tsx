import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardsArrayType } from './CardGrid';
import { useState } from 'react';
import CardContent from '@mui/material/CardContent';

type CatCardProps = {
  card: CardsArrayType;
};

export const CatCard: React.FC<CatCardProps> = ({ card }) => {
  const { img } = card;
  const [isFlipped, setIsFlipped] = useState<Boolean>(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card onClick={handleClick}>
      {isFlipped && (
        <CardMedia
          sx={{ height: 150, width: 100 }}
          component="img"
          image={`/assets/cards/${img}.png`}
        />
      )}
      {!isFlipped && (
        <CardContent sx={{ height: 150, width: 100 }} style={{ backgroundColor: 'green' }} />
      )}
    </Card>
  );
};
