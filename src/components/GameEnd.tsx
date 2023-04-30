import Button from '@mui/material/Button';
import { useMemoryCatContext } from '../context/memoryCatContext';
import { buttonStyle } from '../styles/button';
import { formatTime } from '../utils/formatTime';

export const GameEnd = () => {
  const { stateMemoryCat, dispatchMemoryCat } = useMemoryCatContext();
  const { totalCards, bestTime, currentTime } = stateMemoryCat;

  const handleClick = (gameState: string) => {
    dispatchMemoryCat({ type: 'CLEAR_BOARD' });
    dispatchMemoryCat({ type: 'UPDATE_GAME_STATE', payload: gameState });
  };

  const renderBestTime = () => (
    <>
      {bestTime !== 999999999999999 && (
        <div className="flex flex-col justify-center items-center text-xl">
          <p>{currentTime < bestTime ? 'Previous best time' : 'Best time'}</p>
          <p>{formatTime(bestTime)}</p>
        </div>
      )}
    </>
  );

  const renderCurrentTime = () => (
    <div className="flex flex-col justify-center items-center text-xl gap-2">
      <p>
        {currentTime > bestTime || bestTime !== 999999999999999 ? 'New best time!' : 'Current time'}
      </p>
      <p>{formatTime(currentTime)}</p>
      <p className="text-xs">{`played with: ${totalCards} cards`}</p>
    </div>
  );

  const renderButtons = () => (
    <div className="flex gap-8">
      <Button className={buttonStyle()} variant="outlined" onClick={() => handleClick('GAME_PLAY')}>
        Play again
      </Button>
      <Button className={buttonStyle()} variant="outlined" onClick={() => handleClick('GAME_MENU')}>
        Change Settings
      </Button>
    </div>
  );

  return (
    <div className="mb-24 flex-auto flex flex-col justify-center items-center gap-8">
      <h2 className="text-4xl">Game ended!</h2>
      {/* {renderBestTime()} */}
      {renderCurrentTime()}
      {renderButtons()}
    </div>
  );
};
