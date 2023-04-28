import Button from '@mui/material/Button';
import { useMemoryCatContext } from '../context/memoryCatContext';

export const EndScreen = () => {
  const { stateMemoryCat, dispatchMemoryCat } = useMemoryCatContext();
  const { bestTime, time } = stateMemoryCat;

  const handleClickAgain = () => {
    dispatchMemoryCat({
      type: 'clearBoard',
    });
    dispatchMemoryCat({
      type: 'setState',
      payload: 'play',
    });
  };

  const handleClickSettings = () => {
    dispatchMemoryCat({
      type: 'clearBoard',
    });
    dispatchMemoryCat({
      type: 'setState',
      payload: 'menu',
    });
  };

  return (
    <div className="mb-24 flex-auto flex flex-col justify-center items-center gap-8">
      <h2 className="text-4xl">Game ended!</h2>
      {bestTime !== 'none' && (
        <div className="flex flex-col justify-center items-center text-xl">
          <p>Best time</p>
          <p>{bestTime}</p>
        </div>
      )}
      <div className="flex flex-col justify-center items-center text-xl">
        <p>Current time</p>
        <p>{time}</p>
      </div>
      <div className="flex gap-8">
        <Button
          style={{
            width: 250,
            fontWeight: 600,
            fontSize: 16,
            padding: '10px 20px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
          }}
          variant="outlined"
          onClick={handleClickAgain}
        >
          Play again
        </Button>
        <Button
          style={{
            width: 250,
            fontWeight: 600,
            fontSize: 16,
            padding: '10px 20px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
          }}
          variant="outlined"
          onClick={handleClickSettings}
        >
          Change Settings
        </Button>
      </div>
    </div>
  );
};
