import Image from "next/image";
import Link from "next/link";
import { SlScreenDesktop } from "react-icons/sl";
import { LuMonitorSmartphone } from "react-icons/lu";


const GAMES = [
  { label: 'Wordle (clon)', description: 'Adivina la palabra de 5 letras en 6 intentos.', url: 'https://aleixs-trejo.github.io/wordle', image: '/img/wordle.png', icon: <LuMonitorSmartphone size={24} className="text-white" /> },
  { label: 'Ambidextro (clon)', description: 'Desafía tus hablidades con ambas manos en este clon de Ambidextro, recuerda ampliar la pantalla para empezar a jugar.', url: 'https://jhampo.itch.io/ambidextro-clone', image: '/img/ambidextro-clon.png', icon: <SlScreenDesktop size={24} className="text-white" /> },
  { label: 'Portal (clon)', description: 'Aventurate en este pequeño mundo de portales. Usa la Portal Gun para resolver rompecabezas y desafíos basados en las leyes físicas', url: 'https://portal-clone-three.vercel.app', image: '/img/portal-clon.png', icon: <SlScreenDesktop size={24} className="text-white" /> },
  { label: 'Quake (clon)', description: 'Juega al legendario Quake aquí (no se me ocurren descripciones creativas).', url: 'https://mrdoob.github.io/three-quake', image: '/img/quake-clon.png', icon: <SlScreenDesktop size={24} className="text-white" /> },
];

export const AllGames = () => {
  const gamesMap = GAMES.map(game => (
    <div className="flex flex-col rounded-xl overflow-hidden border border-secondary hover:shadow-md hover:shadow-primary transition-shadow duration-300" key={game.label}>
      <div className="w-full aspect-4/3 border-b border-quaternary select-none overflow-hidden">
        <Image src={game.image} alt={game.label} width={264} height={140} className="w-full h-full object-cover" draggable={false} />
      </div>
      <div className="h-auto grow">
        <div className="flex flex-col gap-4 p-2 bg-bg-card h-full">
          <div className="flex justify-between gap-2">
            <h3 className="text-lg text-white select-none">{game.label}</h3>
            <div className="p-1 rounded md bg-tertiary shrink-0 h-max">
              {game.icon}
            </div>
          </div>
          <p className="text-sm text-gray-400 select-none">{game.description}</p>
          <Link
            href={game.url}
            target="_blank"
            rel="noreferrer"
            className="w-full p-2 mt-auto rounded-sm text-sm text-white text-center bg-primary hover:bg-secondary transition-colors duration-300"
            draggable={false}
          >
            Jugar
          </Link>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {gamesMap}
    </div>
  );
};