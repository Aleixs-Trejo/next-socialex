import { getComments, getUserBySession } from "@/actions";
import { getPostById } from "@/actions";
import { PostCard } from "@/components";
import { BtnBack } from "@/components/btn-back/BtnBack";
import { CommentsUsers } from "@/components/comment/CommentsUsers";
import { InputComment } from "@/components/comment/InputComment";
import { Comment, Post, PostInterface, UserBasic, UserWithCommentsPostsAndReactions } from "@/interfaces";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const PostByIdPage = async ({ params }: Props) => {
  const user: UserBasic | null = await getUserBySession();
  const { id } = await params;

  const post = await getPostById(id);
  if (!post?.ok) notFound();
  if (!post?.data) notFound();

  const postData = post.data as PostInterface;

  const allCommentsUsers = await getComments(postData.id);
  const commentsData = (allCommentsUsers.data || []) as Comment[];

  return (
    <div className="w-9/10 max-w-7xl mx-auto py-12 overflow-hidden relative">
      <BtnBack additionalClass="absolute top-4 left-0" />
      <div className="flex flex-col lg:flex-row h-full border border-primary rounded-lg">
        <div className="lg:w-3/5 lg:border-r lg:border-tertiary lg:overflow-y-auto">
          <PostCard post={postData} additionalClass="border-transparent" />
        </div>
        <div className="flex flex-col lg:w-0 lg:grow">
          <div className="hidden lg:block border-b border-tertiary p-4">
            <div className="flex items-center gap-3">
              <img
                src={postData.user.image || '/default-avatar.png'}
                alt={postData.user.name || 'Usuario'}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-white text-sm">
                  {postData.user.name}
                </p>
                <p className="text-xs text-gray-400">
                  {postData.user.profession || 'Sin profesión'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="overflow-y-auto h-full">
              <CommentsUsers
                comments={commentsData} 
                currentUserId={user?.id}
              />

            </div>
          </div>
          <div className="border-t border-tertiary p-3">
            <InputComment
              postId={postData.id} 
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostByIdPage;