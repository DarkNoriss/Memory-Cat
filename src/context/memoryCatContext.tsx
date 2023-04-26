import { ReactNode, createContext, useContext, useReducer } from 'react';
import { memoryCatReducer } from '../utils/memoryCatReducer';

type MemoryCatContextType = {
  stateMemoryCat: MemoryCatType;
  dispatchMemoryCat: React.Dispatch<any>;
};

const MemoryCatContext = createContext<MemoryCatContextType | null>(null);

export type MemoryCatType = {
  cards: number;
  cardsToGuess: number;
  time: string;
  bestTime: string;
  state: string;
};

const initialState: MemoryCatType = {
  cards: 5,
  cardsToGuess: 2,
  time: '0',
  bestTime: 'none',
  state: 'menu',
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
