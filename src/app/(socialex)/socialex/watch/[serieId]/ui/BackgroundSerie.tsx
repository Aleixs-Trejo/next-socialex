interface Props {
  image: string;
  title: string;
}

export const BackgroundSerie = ({ image, title }: Props) => {
  return (
    <div className="h-[50dvh] w-full bg-cover bg-no-repeat flex bg-center bg-fixed" style={{ backgroundImage: `linear-gradient(to bottom, transparent, rgba(41, 41, 41, 0.5) 50%, transparent), url(${image})` }}>
      <div className="w-full mt-auto p-4">
        <div className="w-9/10 mx-auto max-w-3xl flex flex-col overflow-hidden">
          <h2 className="text-title-main font-semibold leading-20 text-shadow-md ">{title}</h2>
        </div>
      </div>
    </div>
  );
};