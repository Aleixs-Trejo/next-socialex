import { ALL_CONTENT } from "@/config/watch-content";
import Image from "next/image";
import Link from "next/link";

export const AllContentWatch = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ALL_CONTENT.map(item => (
        <Link key={item.id} href={item.href} className="group relative flex flex-col justify-between rounded-xl border border-secondary shadow-md transition-all duration-300 hover:border-bright overflow-hidden" draggable={false}>
          <div className="relative aspect-video w-full overflow-hidden">
            <Image src={item.image} alt={item.title} className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-300" width={320} height={240} draggable={false} />
          </div>
          <div className="flex flex-col gap-2 p-3">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.description.slice(0, 103)}...</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
