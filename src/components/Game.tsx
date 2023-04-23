import { useState } from 'react';
import { EndScreen } from './EndScreen';
import { Menu } from './Menu';
import { Play } from './Play';

export const Game = () => {
  const [gameState, setGameState] = useState<string>('menu');

  return (
    <>
      {gameState === 'menu' && <Menu />}
      {gameState === 'play' && <Play />}
      {gameState === 'end' && <EndScreen />}
    </>
  );
};
