import { GameMenu } from './GameMenu';
import { GamePlay } from './GamePlay';
import { GameEnd } from './GameEnd';
import { useMemoryCatContext } from '../context/memoryCatContext';

type StateComponents = typeof stateComponents;
const stateComponents = {
  GAME_MENU: <GameMenu />,
  GAME_PLAY: <GamePlay />,
  GAME_END: <GameEnd />,
};

export const Game = () => {
  const { stateMemoryCat } = useMemoryCatContext();
  const { gameStatus } = stateMemoryCat;
  const currentComponent = stateComponents[gameStatus as keyof StateComponents];

  return <>{currentComponent}</>;
};
