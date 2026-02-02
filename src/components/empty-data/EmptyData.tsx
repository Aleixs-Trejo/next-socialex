interface Props {
  message: string;
}

export const EmptyData = ({ message }: Props) => {
  return (
    <div className="w-9/10 max-w-xl mx-auto overflow-hidden py-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-gray-400 text-center">{message}</h2>
      </div>
    </div>
  );
};