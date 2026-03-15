export const SinopsisContentWatch = ({ description }: { description: string }) => {
  return (
    <div className="p-5 w-full flex flex-col gap-4 rounded-md bg-bg-card">
      <span>Sinopsis</span>
      <p className="text-white/60 text-xs font-medium tracking-widest">{description}</p>
    </div>
  );
};