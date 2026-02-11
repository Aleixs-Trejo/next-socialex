import Image from "next/image";
import Link from "next/link";

interface Props {
  postId: string;
}

export const OptionsPost = ({ postId }: Props) => {
  return (
    <div className="absolute bottom-2 right-4 ml-auto inset-x-0 w-full max-w-40 rounded-lg bg-quaternary overflow-hidden">
      <div className="w-full flex flex-col">
        <Link href={`/socialex/post/edit/${postId}`} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors duration-300">
          <span className="w-6 h-6 shrink-0 flex select-none">
            <Image
              src="/icons/edit.svg"
              alt="Editar"
              width={16}
              height={16}
              className="w-full h-full"
              draggable={false}
            />
          </span>
          <span className="text-sm text-gray-300 select-none">Editar la wea</span>
        </Link>
      </div>
    </div>
  )
};