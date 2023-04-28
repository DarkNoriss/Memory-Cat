import { CardsArrayType } from '../types/CatTypes';

export const shuffleArray = (array: CardsArrayType[]) => {
  return array
    .map((value) => ({ value, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ value }) => value);
};
