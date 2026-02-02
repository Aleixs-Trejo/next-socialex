import { Title } from "../title/Title";

export const PageNotFound = () => {
  return (
    <div className="w-9/10 max-w-3xl mx-auto overflow-hidden py-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">¡Ups! No encontramos esa página</h2>
        <Title title="Página no encontrada" subtitle="Parece que algo malió sal" />
      </div>
    </div>
  );
};