import { useMemoryCatContext } from '../context/memoryCatContext';
import { CardGrid } from './CardGrid';
import { useEffect } from 'react';

export const Play = () => {
  const { stateMemoryCat, dispatchMemoryCat } = useMemoryCatContext();
  const { cards } = stateMemoryCat;

  useEffect(() => {
    setTimeout(() => {
      const { picked } = cards;
      if (picked.length === 2) {
        if (picked[0] === picked[1]) {
          dispatchMemoryCat({
            type: 'setGuessedCards',
          });
        } else {
          dispatchMemoryCat({
            type: 'hideFlippedCards',
          });
        }
      }
      if (cards.list.length > 0) {
        const checkWinningCond = cards.list.every((card) => card.guessed === true);
        if (checkWinningCond) {
          dispatchMemoryCat({
            type: 'setState',
            payload: 'end',
          });
        }
      }
    }, 600);
  }, [cards.list]);

  return (
    <div className="mb-24 flex-auto flex flex-col justify-center items-center gap-8">
      <CardGrid />
    </div>
  );
};
