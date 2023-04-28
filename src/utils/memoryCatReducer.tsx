import { produce } from 'immer';
import { generateRandomNumber } from './generateRandomNumber';
import { shuffleArray } from './shuffleArray';
import { MemoryCatType, CardsArrayType } from '../types/CatTypes';

type UpdateCardsNumberAction = { type: 'UPDATE_CARDS_NUMBER'; payload: number };
type UpdateGameStateAction = { type: 'UPDATE_GAME_STATE'; payload: string };
type FlipCardAction = {
  type: 'FLIP_CARD';
  payload: {
    index: number;
    id: number;
  };
};
type CreateCardsAction = { type: 'CREATE_CARDS' };
type HideFlippedCardsAction = { type: 'HIDE_FLIPPED_CARDS' };
type SetGuessedCardsAction = { type: 'SET_GUESSED_CARDS' };
type ClearBoardAction = { type: 'CLEAR_BOARD' };

type ActionTypes =
  | UpdateCardsNumberAction
  | UpdateGameStateAction
  | FlipCardAction
  | CreateCardsAction
  | HideFlippedCardsAction
  | SetGuessedCardsAction
  | ClearBoardAction;

export const memoryCatReducer = (state: MemoryCatType, action: ActionTypes) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'UPDATE_CARDS_NUMBER':
        draftState.totalCards = action.payload;
        break;

      case 'CREATE_CARDS':
        const usedImages = new Set<number>();
        const newArray: CardsArrayType[] = Array.from({ length: draftState.totalCards }, (_, i) => {
          const imgId = generateRandomNumber(usedImages);
          return Array.from({ length: draftState.cardsToMatch }, () => ({
            id: i,
            imgId: imgId,
            guessed: false,
            flipped: false,
          }));
        }).flat();
        draftState.cardsData.cardList = shuffleArray(newArray);
        break;

      case 'FLIP_CARD':
        const { index, id } = action.payload;
        const isPicked = state.cardsData.selectedCards.length < 2;
        draftState.cardsData.cardList[index].flipped = isPicked
          ? !draftState.cardsData.cardList[index].flipped
          : draftState.cardsData.cardList[index].flipped;
        if (isPicked) {
          draftState.cardsData.selectedCards.push(id);
          draftState.cardsData.selectedCardIds.push(index);
        }
        break;

      case 'HIDE_FLIPPED_CARDS':
        draftState.cardsData.selectedCardIds.forEach((element) => {
          draftState.cardsData.cardList[element].flipped = false;
        });
        draftState.cardsData.selectedCards = [];
        draftState.cardsData.selectedCardIds = [];
        break;

      case 'SET_GUESSED_CARDS':
        draftState.cardsData.selectedCardIds.forEach((element) => {
          draftState.cardsData.cardList[element].guessed = true;
        });
        draftState.cardsData.selectedCards = [];
        draftState.cardsData.selectedCardIds = [];
        break;

      case 'UPDATE_GAME_STATE':
        draftState.gameStatus = action.payload;
        break;

      case 'CLEAR_BOARD':
        draftState.cardsData.selectedCards = [];
        draftState.cardsData.cardList = [];
        break;

      default:
        console.log('no type');
        break;
    }
  });
};
