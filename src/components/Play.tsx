import Button from '@mui/material/Button';
import { useMemoryCatContext } from '../context/memoryCatContext';

export const Play = () => {
  const { stateMemoryCat, dispatchMemoryCat } = useMemoryCatContext();

  const handleClick = () => {
    dispatchMemoryCat({
      type: 'setState',
      payload: 'end',
    });
  };

  return (
    <div className="mb-24 flex-auto flex flex-col justify-center items-center gap-8">
      <h2>Play</h2>
      <p>{stateMemoryCat.cards} cards</p>
      <Button
        style={{
          width: 250,
          fontWeight: 600,
          fontSize: 16,
          padding: '10px 20px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        }}
        variant="outlined"
        onClick={handleClick}
      >
        Finish the game
      </Button>
    </div>
  );
};
