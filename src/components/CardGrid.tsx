import { useEffect, useRef } from 'react';
import { useMemoryCatContext } from '../context/memoryCatContext';
import { CatCard } from './CatCard';

export const CardGrid = () => {
  const { stateMemoryCat, dispatchMemoryCat } = useMemoryCatContext();
  const { cardsNumber, cardsToGuess, cards } = stateMemoryCat;
  const { list } = cards;
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      dispatchMemoryCat({
        type: 'CREATE_CARDS',
      });
    }
    isMounted.current = true;
  }, [cardsNumber, cardsToGuess]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center w-full gap-4 max-w-6xl">
        {list.map((card, index) => (
          <div key={index}>
            <CatCard index={index} card={card} />
          </div>
        ))}
      </div>
    </div>
  );
};
