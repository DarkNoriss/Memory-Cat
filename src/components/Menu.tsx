import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { useState } from 'react';

export const Menu = () => {
  const [cards, setCards] = useState<number>(5);

  return (
    <div className="mb-24 flex-auto flex flex-col justify-center center items-center gap-8">
      <h2 className="text-4xl">How many cards u want to play with?</h2>
      <Box width={400}>
        <Slider
          defaultValue={5}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(e, value) => setCards(value as number)}
          min={2}
          max={20}
        />
      </Box>
      <Button variant="outlined" onClick={() => console.log(cards)}>
        Start the game!
      </Button>
    </div>
  );
};
