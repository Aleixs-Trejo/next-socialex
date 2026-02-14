import Link from "next/link";
import { getReactionPost } from "@/actions";
import { getAllReactionsFromPost } from "@/actions";
import { PostWithUser } from "@/interfaces";
import { dateFriendly } from "@/utils/dateFriendly";
import { getServerSession } from "@/lib/get-server-session";
import { ImageCustom, PostMediaSwiper } from "..";
import { PostReactionBtn } from "./ui/PostReactionBtn";
import { PostReactionsUsers } from "./ui/PostReactionsUsers";
import { BtnPostOptions } from "./ui/BtnPostOptions";
import { OptionsPost } from "./ui/OptionsPost";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from "remark-breaks";

interface Props {
  post: PostWithUser;
  additionalClass?: string;
}

export const PostCard = async ({ post, additionalClass }: Props) => {
  const session = await getServerSession();
  
  const hasContent = Boolean(post.content?.trim());
  const hasMedia = post.media && post.media.length > 0;

  const currentReaction = await getReactionPost(post.id);
  const getReactions = await getAllReactionsFromPost(post.id);
  const usersReactions = getReactions.data?.reactions.map(r => r.user.name);

  return (
    <div className={`flex flex-col rounded-lg shadow-md ${additionalClass ? additionalClass : 'border border-primary'}`}>
      <div className="w-full flex justify-between items-start p-3 sm:p-4 relative">
        <div className="flex items-center gap-2">
          <Link href={`/socialex/user/${post.userId}`}>
            <ImageCustom
              src={post.user.image || undefined}
              alt={post.user.name || ""}
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
          <div className="flex flex-col">
            <Link href={`/socialex/user/${post.userId}`} className="text-sm font-medium hover:underline">
              {post.user.name}
            </Link>
            <p className="text-sm text-gray-300">{post.user.profession}</p>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-xs">
                {dateFriendly(post.createdAt.toISOString())}
              </span>
              <span>·</span>
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
        </div>
        {session?.user?.id === post.userId && (
          <BtnPostOptions>
            <OptionsPost postId={post.id} />
          </BtnPostOptions>
        )}
      </div>
      {(hasContent || hasMedia) && (
        <div className="flex flex-col gap-2 pb-4">
          {hasContent && (
            <Link href={`/socialex/post/${post.id}`} title="Click para ir al post">
              <div className="text-xl font-semibold p-3 sm:p-4 prose prose-invert max-w-none [&_p]:text-white [&_strong]:text-base [&_hr]:mt-10 [&_li]:my-2 [&_li]:p-0 [&_h2]:mb-6">
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                  {post.content}
                </ReactMarkdown>
              </div>
            </Link>
          )}
          {hasMedia && (
            <div className="w-full aspect-video bg-black">
              <PostMediaSwiper
                media={post.media} 
                userName={post.user.name || undefined}
                additionalClass="cursor-pointer"
              />
            </div>
          )}
        </div>
      )}
      <div className="w-full flex items-center justify-between p-3 sm:p-4">
        <PostReactionsUsers allReactions={getReactions.data?.totalReactions || 0} usersReactions={usersReactions || []} groupedReactions={getReactions.data?.groupedReactions} />
        <Link href={`/socialex/post/${post.id}`} className="flex items-center gap-2 cursor-pointer hover:underline">
          <span className="text-xs">{post.comments.length} comentarios</span>
        </Link>
      </div>
      {session?.user && (
        <>
          <div className="border-b border-tertiary mx-3" />
          <div className="flex items-center gap-2 px-3 py-1">
            <PostReactionBtn postId={post.id} currentReaction={currentReaction.data?.type || null} />
            <Link
              href={`/socialex/post/${post.id}`}
              title="Click para ir al post"
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
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
