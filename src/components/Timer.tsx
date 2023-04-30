import { useEffect, useState } from 'react';
import { useMemoryCatContext } from '../context/memoryCatContext';
import { formatTime } from '../utils/formatTime';

export const Timer = () => {
  const { stateMemoryCat, dispatchMemoryCat } = useMemoryCatContext();
  const { currentTime, timerOn, gameStatus } = stateMemoryCat;

  useEffect(() => {
    let interval: any = null;

    if (timerOn) {
      interval = setInterval(() => {
        dispatchMemoryCat({ type: 'UPDATE_TIMER', payload: 1 });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <>{gameStatus === 'GAME_PLAY' && <h3 className="text-2xl">{formatTime(currentTime)}</h3>}</>
  );
};

// UPDATE_DISPLAY_TIMER
