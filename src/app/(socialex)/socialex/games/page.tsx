import { Title } from "@/components";
import { AllGames } from "./ui/AllGames";

export const metadata = {
  title: "Juegos | Socialex",
  description: "Descubre los mejores juegos para navegador en Socialex.",
};

const GamesPage = () => {
  return (
    <div className="w-9/10 max-w-3xl mx-auto overflow-hidden py-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">(No todos los juegos fueron hechos por mí, se recomienda abrirlo en PC)</span>
          <Title title="Juegos" subtitle="Los mejores jueguitos UwU" />
        </div>
        <AllGames />
      </div>
    </div>
  );
};

export default GamesPage;