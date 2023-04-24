import { produce } from 'immer';
import { MemoryCatType } from '../context/memoryCatContext';

type ActionTypes = { type: 'setCards'; payload: number } | { type: 'setState'; payload: string };

export const memoryCatReducer = (state: MemoryCatType, action: ActionTypes) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'setCards':
        draftState.cards = action.payload;
        break;

      case 'setState':
        draftState.state = action.payload;
        break;

      default:
        console.log('no type');
        break;
    }
  });
};
