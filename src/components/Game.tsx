import { Menu } from './Menu';
import { Play } from './Play';
import { EndScreen } from './EndScreen';
import { useMemoryCatContext } from '../context/memoryCatContext';

export const Game = () => {
  const { stateMemoryCat, dispatchMemoryCat } = useMemoryCatContext();
  const { state } = stateMemoryCat;

  return (
    <>
      {state === 'menu' && <Menu />}
      {state === 'play' && <Play />}
      {state === 'end' && <EndScreen />}
    </>
  );
};
