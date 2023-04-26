export const generateRandomNumber = (usedImages: Set<number>): number => {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 17) + 1;
  } while (usedImages.has(randomNumber));
  usedImages.add(randomNumber);
  return randomNumber;
};
