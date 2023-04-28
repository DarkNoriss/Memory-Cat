import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { useMemoryCatContext } from '../context/memoryCatContext';

export const Menu = () => {
  const { stateMemoryCat, dispatchMemoryCat } = useMemoryCatContext();

  const handleChange = (value: number) => {
    dispatchMemoryCat({
      type: 'SET_CARDS',
      payload: value,
    });
  };

  const handleClick = () => {
    dispatchMemoryCat({
      type: 'setState',
      payload: 'play',
    });
  };

  return (
    <div className="mb-24 flex-auto flex flex-col justify-center items-center gap-8">
      <h2 className="text-4xl">How many cards do you want to play with?</h2>
      <Box width={400}>
        <Slider
          aria-label="Default"
          valueLabelDisplay="auto"
          value={stateMemoryCat.cardsNumber}
          onChange={(e, value) => handleChange(value as number)}
          min={2}
          max={17}
        />
      </Box>
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
        Start the game
      </Button>
    </div>
  );
};
