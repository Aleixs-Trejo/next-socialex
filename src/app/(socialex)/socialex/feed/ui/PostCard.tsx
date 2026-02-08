import { ImageCustom, PostMediaSwiper } from "@/components";
import { PostWithUser } from "@/interfaces";
import { postDate } from "@/utils/dateFriendly";
import Image from "next/image";

interface Props {
  post: PostWithUser;
}

export const PostCard = ({ post }: Props) => {
  const hasContent = Boolean(post.content?.trim());
  const hasMedia = post.media && post.media.length > 0;

  return (
    <div className="flex flex-col border border-secondary rounded-lg shadow-md">
      <div className="w-full flex justify-between items-start p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <ImageCustom
            src={post.user.image || undefined}
            alt={post.user.name || ""}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-sm font-medium">{post.user.name}</p>
            <p className="text-xs text-gray-500">{post.user.profession}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 py-2">
          <span className="text-xs text-gray-500">
            {postDate(post.createdAt.toISOString())}
          </span>
          <svg
            viewBox="0 0 16 16"
            width="12"
            height="12"
            fill="currentColor"
            className="shrink-0 text-white"
          >
            <title>Compartido con: Público</title>
            <g fillRule="evenodd" transform="translate(-448 -544)">
              <g>
                <path
                  d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434"
                  transform="translate(354 143.5)"
                ></path>
                <path
                  d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096"
                  transform="translate(354 143.5)"
                ></path>
                <path
                  fillRule="nonzero"
                  d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
                  transform="translate(354 143.5)"
                ></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
      {(hasContent || hasMedia) && (
        <div className="flex flex-col gap-2 pb-4">
          {hasContent && <p className="text-xl font-semibold p-3 sm:p-4">{post.content}</p>}
          {hasMedia && (
            <div className="w-full aspect-video bg-black">
              <PostMediaSwiper
                media={post.media} 
                userName={post.user.name || undefined}
              />
            </div>
          )}
        </div>
      )}
      <div className="w-full flex items-center justify-between p-3 sm:p-4">
        <button type="button" className="flex items-center gap-2 cursor-pointer hover:underline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="shrink-0 select-none pointer-events-none"
          >
            <rect width="20" height="20" fill="none"></rect>
            <path
              fill="currentColor"
              d="M7.993 6.003h-.719a7 7 0 0 0 .339-1.118c.098-.486.142-1.054-.019-1.573c-.17-.55-.56-1.009-1.234-1.235c-.863-.289-1.608.317-1.924.925L3.143 5.49a2.5 2.5 0 0 1-.976 1.017l-1.161.665a2 2 0 0 0-.88 2.435l.311.834a2 2 0 0 0 1.313 1.22l4.243 1.24a2.5 2.5 0 0 0 3.09-1.66l.82-2.646a2 2 0 0 0-1.91-2.592m4.733 8h-.719a2 2 0 0 1-1.91-2.593l.82-2.646a2.5 2.5 0 0 1 3.09-1.66l4.243 1.24a2 2 0 0 1 1.313 1.22l.311.835a2 2 0 0 1-.88 2.435l-1.161.665a2.5 2.5 0 0 0-.976 1.016l-1.293 2.488c-.316.608-1.06 1.214-1.924.925c-.674-.226-1.064-.685-1.234-1.235c-.16-.518-.118-1.087-.019-1.573c.084-.414.216-.805.338-1.117"
            ></path>
          </svg>
          <span className="text-xs text-gray-200 select-none pointer-events-none">{post.reactions.length}</span>
        </button>
        <button type="button" className="flex items-center gap-2 cursor-pointer hover:underline">
          <span className="text-xs">{post.comments.length} comentarios</span>
        </button>
      </div>
      <div className="border-b border-tertiary mx-3" />
      <div className="flex items-center gap-2 px-3 py-1 overflow-hidden">
        <button
          type="button"
          className="flex items-center justify-center gap-2 text-gray-300 p-1.5 grow cursor-pointer transition-colors duration-300 rounded-lg hover:bg-secondary/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="user-select-none pointer-events-none"
          >
            <rect width="20" height="20" fill="none"></rect>
            <path
              fill="currentColor"
              d="M5.324 3.463c.2-.385.52-.504.718-.437c.356.119.518.326.597.582c.089.287.078.663-.006 1.079a6 6 0 0 1-.351 1.102a7 7 0 0 1-.207.448l-.012.023l-.003.005a.5.5 0 0 0 .44.738h1.493a1 1 0 0 1 .955 1.296l-.82 2.646a1.5 1.5 0 0 1-1.854.996l-4.244-1.24a1 1 0 0 1-.656-.61l-.312-.834a1 1 0 0 1 .44-1.218l1.162-.664A3.5 3.5 0 0 0 4.03 5.95zm2.669 2.54h-.719a7 7 0 0 0 .339-1.118c.098-.486.142-1.054-.019-1.573c-.17-.55-.56-1.009-1.234-1.235c-.863-.289-1.608.317-1.924.925L3.143 5.49a2.5 2.5 0 0 1-.976 1.017l-1.161.665a2 2 0 0 0-.88 2.435l.311.834a2 2 0 0 0 1.313 1.22l4.243 1.24a2.5 2.5 0 0 0 3.09-1.66l.82-2.646a2 2 0 0 0-1.91-2.592m6.683 10.54c-.2.385-.52.503-.718.437c-.356-.12-.518-.327-.597-.582c-.089-.288-.078-.664.006-1.08c.082-.406.225-.802.351-1.101a7 7 0 0 1 .207-.449l.012-.023l.003-.005a.5.5 0 0 0-.44-.737h-1.493a1 1 0 0 1-.955-1.297l.82-2.646a1.5 1.5 0 0 1 1.854-.996l4.243 1.24a1 1 0 0 1 .657.61l.311.834a1 1 0 0 1-.44 1.218l-1.16.665a3.5 3.5 0 0 0-1.368 1.423zm-2.669-2.54h.719a7 7 0 0 0-.339 1.117c-.099.487-.142 1.055.019 1.573c.17.55.56 1.01 1.234 1.235c.863.289 1.608-.317 1.924-.925l1.293-2.488a2.5 2.5 0 0 1 .976-1.017l1.161-.664a2 2 0 0 0 .88-2.435l-.311-.835a2 2 0 0 0-1.313-1.22l-4.244-1.24a2.5 2.5 0 0 0-3.089 1.66l-.82 2.646a2 2 0 0 0 1.91 2.592"
            ></path>
          </svg>
          <span className="user-select-none pointer-events-none text-xs">Reaccionar</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 text-gray-300 p-1.5 grow cursor-pointer transition-colors duration-300 rounded-lg hover:bg-secondary/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <rect width="24" height="24" fill="none"></rect>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 21a9 9 0 1 0-9-9c0 1.488.36 2.89 1 4.127L3 21l4.873-1c1.236.639 2.64 1 4.127 1"
            ></path>
          </svg>
          <span className="user-select-none pointer-events-none text-xs">Comentar</span>
        </button>
      </div>
    </div>
  );
};
