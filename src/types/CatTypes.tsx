export type MemoryCatType = {
  totalCards: number;
  cardsToMatch: number;
  elapsedTime: string;
  bestRecordTime: string;
  gameStatus: string;
  cardsData: CardType;
};

export type CardType = {
  selectedCards: number[];
  selectedCardIds: number[];
  cardList: CardsArrayType[];
};

export type CardsArrayType = {
  id: number;
  imgId: number;
  guessed: boolean;
  flipped: boolean;
};
