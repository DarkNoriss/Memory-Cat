import { produce } from 'immer';
import { CardsArrayType, MemoryCatType } from '../context/memoryCatContext';
import { generateRandomNumber } from './generateRandomNumber';
import { shuffleArray } from './shuffleArray';

type ActionTypes =
  | { type: 'SET_CARDS'; payload: number }
  | { type: 'setState'; payload: string }
  | {
      type: 'FLIP_CARD';
      payload: {
        index: number;
        id: number;
      };
    }
  | { type: 'CREATE_CARDS' }
  | { type: 'hideFlippedCards' }
  | { type: 'setGuessedCards' }
  | { type: 'clearBoard' };

export const memoryCatReducer = (state: MemoryCatType, action: ActionTypes) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'SET_CARDS':
        draftState.cardsNumber = action.payload;
        break;

      case 'CREATE_CARDS':
        const usedImages = new Set<number>();
        const newArray: CardsArrayType[] = Array.from(
          { length: draftState.cardsNumber },
          (_, i) => {
            const imgId = generateRandomNumber(usedImages);
            return Array.from({ length: draftState.cardsToGuess }, () => ({
              id: i,
              imgId: imgId,
              guessed: false,
              flipped: false,
            }));
          }
        ).flat();

        draftState.cards.list = shuffleArray(newArray);
        break;

      case 'FLIP_CARD':
        const { index, id } = action.payload;
        const isPicked = state.cards.picked.length < 2;
        draftState.cards.list[index].flipped = isPicked
          ? !draftState.cards.list[index].flipped
          : draftState.cards.list[index].flipped;
        if (isPicked) {
          draftState.cards.picked.push(id);
          draftState.cards.pickedId.push(index);
        }
        break;

      case 'hideFlippedCards':
        draftState.cards.pickedId.forEach((element) => {
          draftState.cards.list[element].flipped = false;
        });
        draftState.cards.picked = [];
        draftState.cards.pickedId = [];
        break;

      case 'setGuessedCards':
        draftState.cards.pickedId.forEach((element) => {
          draftState.cards.list[element].guessed = true;
        });
        draftState.cards.picked = [];
        draftState.cards.pickedId = [];
        break;

      case 'setState':
        draftState.state = action.payload;
        break;

      case 'clearBoard':
        draftState.cards.picked = [];
        draftState.cards.list = [];
        break;

      default:
        console.log('no type');
        break;
    }
  });
};
