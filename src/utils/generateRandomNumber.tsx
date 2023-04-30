import { NUMBER_OF_CATS } from '../constants/constants';

export const generateRandomNumber = (usedImages: Set<number>): number => {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * NUMBER_OF_CATS) + 1;
  } while (usedImages.has(randomNumber));
  usedImages.add(randomNumber);
  return randomNumber;
};
