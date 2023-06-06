import { ReactNode, createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { memoryCatReducer } from '../utils/memoryCatReducer';
import { MemoryCatType } from '../types/CatTypes';

type MemoryCatContextType = {
  stateMemoryCat: MemoryCatType;
  dispatchMemoryCat: React.Dispatch<any>;
};

const MemoryCatContext = createContext<MemoryCatContextType | null>(null);

const initialState: MemoryCatType = {
  totalCards: 5,
  cardsToMatch: 2,
  currentTime: 0,
  timerOn: false,
  bestTime: 999999999999999,
  gameStatus: 'GAME_MENU',
  cardsData: {
    selectedCards: [],
    selectedCardIds: [],
    cardList: [],
  },
};

export const useMemoryCatContext = () => {
  const context = useContext(MemoryCatContext);
  if (!context) {
    throw new Error('useCatGame must be used within a CatGameProvider');
  }
  return context;
};

export const MemoryCatProvider = ({ children }: { children: ReactNode }) => {
  const [stateMemoryCat, dispatchMemoryCat] = useReducer(memoryCatReducer, initialState);
  const { cardsData } = stateMemoryCat;

  useEffect(() => {
    if (cardsData.cardList.length > 0) {
      const { selectedCards } = cardsData;

      if (selectedCards.length === 2) {
        const actionType =
          selectedCards[0] === selectedCards[1] ? 'SET_GUESSED_CARDS' : 'HIDE_FLIPPED_CARDS';
        setTimeout(() => {
          dispatchMemoryCat({ type: actionType });
        }, 600);
      }

      const checkWinningCond = cardsData.cardList.every((card) => card.guessed === true);
      if (checkWinningCond) {
        dispatchMemoryCat({
          type: 'UPDATE_GAME_STATE',
          payload: 'GAME_END',
        });
      }
    }
  }, [cardsData.cardList]);

  return (
    <MemoryCatContext.Provider value={{ stateMemoryCat, dispatchMemoryCat }}>
      {children}
    </MemoryCatContext.Provider>
  );
};
