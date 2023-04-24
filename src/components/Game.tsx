import { useState } from 'react';
import { EndScreen } from './EndScreen';
import { Menu } from './Menu';
import { Play } from './Play';
import { useMemoryCatContext } from '../context/memoryCatContext';

export const Game = () => {
  const { stateMemoryCat, dispatchMemoryCat } = useMemoryCatContext();

  return (
    <>
      {stateMemoryCat.state === 'menu' && <Menu />}
      {stateMemoryCat.state === 'play' && <Play />}
      {stateMemoryCat.state === 'end' && <EndScreen />}
    </>
  );
};
