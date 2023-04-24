import { Footer } from './components/Footer';
import { Game } from './components/Game';
import { Header } from './components/Header';
import { MemoryCatProvider } from './context/memoryCatContext';

export const App = () => {
  return (
    <div className="w-screen h-screen flex flex-col bg-gray-800 overflow-hidden">
      <MemoryCatProvider>
        <Header />
        <Game />
        <Footer />
      </MemoryCatProvider>
    </div>
  );
};
