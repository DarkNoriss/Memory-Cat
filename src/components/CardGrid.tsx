import { useEffect, useRef } from 'react';
import { useMemoryCatContext } from '../context/memoryCatContext';
import { CatCard } from './CatCard';

export const CardGrid = () => {
  const { stateMemoryCat, dispatchMemoryCat } = useMemoryCatContext();
  const {
    totalCards,
    cardsToMatch,
    cardsData: { cardList },
  } = stateMemoryCat;
  const isComponentMounted = useRef(false);

  useEffect(() => {
    if (!isComponentMounted.current) {
      dispatchMemoryCat({
        type: 'CREATE_CARDS',
      });
    }
    isComponentMounted.current = true;
  }, [totalCards, cardsToMatch]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center w-full gap-4 max-w-6xl">
        {cardList.map((card, index) => (
          <CatCard key={index} index={index} card={card} />
        ))}
      </div>
    </div>
  );
};
