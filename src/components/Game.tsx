import { GameMenu } from './GameMenu';
import { GamePlay } from './GamePlay';
import { GameEnd } from './GameEnd';
import { useMemoryCatContext } from '../context/memoryCatContext';

type StateComponentsType = {
  [key: string]: JSX.Element;
  GAME_MENU: JSX.Element;
  GAME_PLAY: JSX.Element;
  GAME_END: JSX.Element;
};

export const Game = () => {
  const { stateMemoryCat } = useMemoryCatContext();
  const { gameStatus } = stateMemoryCat;

  const stateComponents: StateComponentsType = {
    GAME_MENU: <GameMenu />,
    GAME_PLAY: <GamePlay />,
    GAME_END: <GameEnd />,
  };

  return <>{stateComponents[gameStatus] || null}</>;
};
