import { useEffect, useRef, useState } from 'react';
import { useMemoryCatContext } from '../context/memoryCatContext';
import Grid2 from '@mui/material/Unstable_Grid2';
import { generateRandomNumber } from '../utils/generateRandomNumber';
import { CatCard } from './CatCard';

export type CardsArrayType = {
  id: number;
  imgId: number;
  guessed: boolean;
};

export const CardGrid = () => {
  const { stateMemoryCat } = useMemoryCatContext();
  const { cards, cardsToGuess } = stateMemoryCat;
  const [cardsList, setCardsList] = useState<CardsArrayType[]>([]);
  const usedImages = new Set<number>();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      const createCards = () => {
        const newArray: CardsArrayType[] = Array.from({ length: cards }, (_, i) => {
          const imgId = generateRandomNumber(usedImages);
          return Array.from({ length: cardsToGuess }, () => ({
            id: i,
            imgId: imgId,
            guessed: false,
          }));
        }).flat();

        const shuffledCards = newArray
          .map((value) => ({ value, sortKey: Math.random() }))
          .sort((a, b) => a.sortKey - b.sortKey)
          .map(({ value }) => value);
        setCardsList(shuffledCards);
      };

      isMounted.current = true;
      createCards();
    }
  }, [cards, cardsToGuess]);

  return (
    <>
      {cardsList.length > 25 ? (
        <div>
          <Grid2 container spacing={4} style={{ justifyContent: 'center' }}>
            {cardsList.slice(0, cardsList.length / 4).map((card, index) => (
              <Grid2 key={index}>
                <CatCard index={index} card={card} />
              </Grid2>
            ))}
          </Grid2>
          <Grid2 container spacing={4} style={{ justifyContent: 'center' }}>
            {cardsList
              .slice(cardsList.length / 4, (cardsList.length * 2) / 4)
              .map((card, index) => (
                <Grid2 key={index}>
                  <CatCard index={index} card={card} />
                </Grid2>
              ))}
          </Grid2>
          <Grid2 container spacing={4} style={{ justifyContent: 'center' }}>
            {cardsList
              .slice((cardsList.length * 2) / 4, (cardsList.length * 3) / 4)
              .map((card, index) => (
                <Grid2 key={index}>
                  <CatCard index={index} card={card} />
                </Grid2>
              ))}
          </Grid2>
          <Grid2 container spacing={4} style={{ justifyContent: 'center' }}>
            {cardsList.slice((cardsList.length * 3) / 4).map((card, index) => (
              <Grid2 key={index}>
                <CatCard index={index} card={card} />
              </Grid2>
            ))}
          </Grid2>
        </div>
      ) : cardsList.length > 17 ? (
        <div>
          <Grid2 container spacing={4} style={{ justifyContent: 'center' }}>
            {cardsList.slice(0, cardsList.length / 3).map((card, index) => (
              <Grid2 key={index}>
                <CatCard index={index} card={card} />
              </Grid2>
            ))}
          </Grid2>
          <Grid2 container spacing={4} style={{ justifyContent: 'center' }}>
            {cardsList
              .slice(cardsList.length / 3, (cardsList.length * 2) / 3)
              .map((card, index) => (
                <Grid2 key={index}>
                  <CatCard index={index} card={card} />
                </Grid2>
              ))}
          </Grid2>
          <Grid2 container spacing={4} style={{ justifyContent: 'center' }}>
            {cardsList.slice((cardsList.length * 2) / 3).map((card, index) => (
              <Grid2 key={index}>
                <CatCard index={index} card={card} />
              </Grid2>
            ))}
          </Grid2>
        </div>
      ) : cardsList.length > 9 ? (
        <div>
          <Grid2 container spacing={4} style={{ justifyContent: 'center' }}>
            {cardsList.slice(0, cardsList.length / 2).map((card, index) => (
              <Grid2 key={index}>
                <CatCard index={index} card={card} />
              </Grid2>
            ))}
          </Grid2>
          <Grid2 container spacing={4} style={{ justifyContent: 'center' }}>
            {cardsList.slice(cardsList.length / 2).map((card, index) => (
              <Grid2 key={index}>
                <CatCard index={index} card={card} />
              </Grid2>
            ))}
          </Grid2>
        </div>
      ) : (
        <Grid2 container spacing={4} style={{ justifyContent: 'center' }}>
          {cardsList.map((card, index) => (
            <Grid2 key={index}>
              <CatCard index={index} card={card} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </>
  );
};
