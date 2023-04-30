import { produce } from 'immer';
import { generateRandomNumber } from './generateRandomNumber';
import { shuffleArray } from './shuffleArray';
import { MemoryCatType, CardsArrayType } from '../types/CatTypes';

type UpdateCardsNumberAction = { type: 'UPDATE_CARDS_NUMBER'; payload: number };
type UpdateGameStateAction = { type: 'UPDATE_GAME_STATE'; payload: string };
type UpdateTimer = { type: 'UPDATE_TIMER'; payload: number };
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
type CheckBestTime = { type: 'CHECK_BEST_TIME' };

type ActionTypes =
  | UpdateCardsNumberAction
  | UpdateGameStateAction
  | UpdateTimer
  | FlipCardAction
  | CreateCardsAction
  | HideFlippedCardsAction
  | SetGuessedCardsAction
  | ClearBoardAction
  | CheckBestTime;

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
        if (action.payload === 'GAME_PLAY') draftState.timerOn = true;
        if (action.payload === 'GAME_END') draftState.timerOn = false;

        draftState.gameStatus = action.payload;
        break;

      case 'CLEAR_BOARD':
        draftState.cardsData.selectedCards = [];
        draftState.cardsData.cardList = [];
        break;

      case 'UPDATE_TIMER':
        draftState.currentTime += action.payload;
        break;

      case 'CHECK_BEST_TIME':
        if (draftState.currentTime < draftState.bestTime) {
          console.log('prev bigger');
          draftState.bestTime = draftState.currentTime;
        }
        break;

      default:
        console.log('no type');
        break;
    }
  });
};
