import { useMemoryCatContext } from '../context/memoryCatContext';
import { CardGrid } from './CardGrid';
import { useEffect } from 'react';

export const GamePlay = () => {
  const { stateMemoryCat, dispatchMemoryCat } = useMemoryCatContext();
  const { cardsData } = stateMemoryCat;

  useEffect(() => {
    setTimeout(() => {
      if (cardsData.cardList.length > 0) {
        const { selectedCards } = cardsData;
        if (selectedCards.length === 2) {
          const actionType =
            selectedCards[0] === selectedCards[1] ? 'SET_GUESSED_CARDS' : 'HIDE_FLIPPED_CARDS';
          dispatchMemoryCat({ type: actionType });
        }

        const checkWinningCond = cardsData.cardList.every((card) => card.guessed === true);
        if (checkWinningCond) {
          dispatchMemoryCat({
            type: 'UPDATE_GAME_STATE',
            payload: 'GAME_END',
          });
        }
      }
    }, 600);
  }, [cardsData.cardList]);

  return (
    <div className="mb-24 flex-auto flex flex-col justify-center items-center gap-8">
      <CardGrid />
    </div>
  );
};