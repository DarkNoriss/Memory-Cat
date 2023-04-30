import { Timer } from './Timer';

export const Header = () => {
  return (
    <header className="h-32 w-full flex justify-between items-center px-8 font-bold">
      <h1 className="text-6xl">Memory Cat</h1>
      <Timer />
    </header>
  );
};
