import { logoFont } from "@/config/fonts";

interface Props {
  title: string;
  aditionalClass?: string;
  subtitle?: string;
}

export const Title = ({ title, aditionalClass, subtitle }: Props) => {
  return (
    <div className="flex flex-col border-b-2 pb-4 border-bg-card">
      <h2 className={`text-title font-semibold ${logoFont.className} ${aditionalClass ? aditionalClass : ''}`}>{title}</h2>
      {
        subtitle && (
          <span className="text-sm text-gray-400">{subtitle}</span>
        )
      }
    </div>
  );
};