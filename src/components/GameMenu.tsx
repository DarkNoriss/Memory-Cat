import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { useMemoryCatContext } from '../context/memoryCatContext';
import { buttonStyle } from '../styles/button';
import { NUMBER_OF_CATS } from '../constants/constants';

export const GameMenu = () => {
  const { stateMemoryCat, dispatchMemoryCat } = useMemoryCatContext();

  const updateCardsNumber = (value: number) => {
    dispatchMemoryCat({
      type: 'UPDATE_CARDS_NUMBER',
      payload: value,
    });
  };

  const updateGameState = () => {
    dispatchMemoryCat({
      type: 'UPDATE_GAME_STATE',
      payload: 'GAME_PLAY',
    });
  };

  return (
    <div className="mb-24 flex-auto flex flex-col justify-center items-center gap-8">
      <h2 className="text-4xl">How many cards do you want to play with?</h2>
      <Box width={400}>
        <p id="sliderLabel">Select the number of cards:</p>
        <MySlider totalCards={stateMemoryCat.totalCards} updateCardsNumber={updateCardsNumber} />
      </Box>
      <Button className={buttonStyle()} variant="outlined" onClick={updateGameState}>
        Start the game
      </Button>
    </div>
  );
};

type MySliderProps = {
  totalCards: number;
  updateCardsNumber: (value: number) => void;
};

const MySlider: React.FC<MySliderProps> = ({ totalCards, updateCardsNumber }) => (
  <Slider
    aria-labelledby="sliderLabel"
    valueLabelDisplay="auto"
    value={totalCards}
    onChange={(_, value) => updateCardsNumber(value as number)}
    min={2}
    max={NUMBER_OF_CATS}
  />
);
