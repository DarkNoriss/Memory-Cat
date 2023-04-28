import Button from '@mui/material/Button';
import { useMemoryCatContext } from '../context/memoryCatContext';
import { buttonStyle } from '../styles/button';

export const GameEnd = () => {
  const { stateMemoryCat, dispatchMemoryCat } = useMemoryCatContext();
  const { bestRecordTime, elapsedTime } = stateMemoryCat;

  const handleClick = (gameState: string) => {
    dispatchMemoryCat({ type: 'CLEAR_BOARD' });
    dispatchMemoryCat({ type: 'UPDATE_GAME_STATE', payload: gameState });
  };

  const renderBestTime = () => (
    <div className="flex flex-col justify-center items-center text-xl">
      <p>Best elapsedTime</p>
      <p>{bestRecordTime}</p>
    </div>
  );

  const renderCurrentTime = () => (
    <div className="flex flex-col justify-center items-center text-xl">
      <p>Current elapsedTime</p>
      <p>{elapsedTime}</p>
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
      {bestRecordTime !== 'none' && renderBestTime()}
      {renderCurrentTime()}
      {renderButtons()}
    </div>
  );
};
