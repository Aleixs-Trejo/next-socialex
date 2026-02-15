import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { BtnDeletePost } from "./BtnDeletePost";
import { BtnPostOptions } from "./BtnPostOptions";

interface Props {
  postId: string;
}

export const OptionsPost = ({ postId }: Props) => {
  return (
    <BtnPostOptions>
      <div className="absolute -bottom-2/5 right-4 p-2 ml-auto inset-x-0 w-full max-w-45 rounded-lg bg-accent overflow-hidden border border-secondary z-50">
        <div className="w-full flex flex-col">
          <div className="w-full border-b border-tertiary">
            <Link href={`/socialex/post/edit/${postId}`} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-secondary/50 transition-colors duration-300">
              <CiEdit size={16} className="shrink-0" />
              <span className="text-sm text-gray-300 select-none">Editar la wea</span>
            </Link>
          </div>
          <div className="w-full">
            <BtnDeletePost postId={postId} />
          </div>
        </div>
      </div>
    </BtnPostOptions>
  )
};