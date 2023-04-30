import { ReactNode, createContext, useContext, useReducer } from 'react';
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

  return (
    <MemoryCatContext.Provider value={{ stateMemoryCat, dispatchMemoryCat }}>
      {children}
    </MemoryCatContext.Provider>
  );
};
