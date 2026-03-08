interface Props {
  image: string;
  title: string;
}

export const BackgroundSeason = ({ image, title }: Props) => {
  return (
    <div className="min-h-30 h-[30dvw] max-h-84 w-full bg-cover bg-no-repeat flex bg-center bg-fixed shadow-[inset_0_0_80px_#000]" style={{ backgroundImage: `url(${image})` }}>
      <div className="w-full mt-auto p-4">
        <div className="w-9/10 mx-auto max-w-5xl flex flex-col overflow-hidden">
          <div className="flex items-center flex-wrap gap-2">
          <h1 className="text-title-main font-semibold leading-20 text-shadow-md">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};