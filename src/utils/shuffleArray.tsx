import { produce } from 'immer';
import { CardsArrayType } from '../types/CatTypes';

export const shuffleArray = (array: CardsArrayType[]): CardsArrayType[] => {
  return produce(array, (draftArray: CardsArrayType[]) => {
    for (let i = draftArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [draftArray[i], draftArray[j]] = [draftArray[j], draftArray[i]];
    }
  });
};
