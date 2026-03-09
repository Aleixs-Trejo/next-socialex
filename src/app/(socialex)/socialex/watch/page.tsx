import { Title } from "@/components";
import { AllContentWatch } from "./ui/AllContentWatch";
import { connection } from "next/server";

export const metadata = {
  title: "Mira todo lo que quieras | Socialex",
  description: "Watch Page",
}

const WatchPage = async () => {
  await connection();

  return (
    <div className="w-9/10 max-w-3xl mx-auto overflow-hidden py-8">
      <div className="flex flex-col gap-4">
        <Title title="Mira todo lo que quieras" subtitle="Disfruta de tus favoritos" />
        <AllContentWatch />
      </div>
    </div>
  );
};

export default WatchPage;