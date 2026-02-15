import { getComments, getPostById, getUserBySession } from "@/actions";
import { OverlayModal, PostCard } from "@/components";
import { CommentsUsers } from "@/components/comment/CommentsUsers";
import { InputComment } from "@/components/comment/InputComment";
import { getServerSession } from "@/lib/get-server-session";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const PostModal = async ({ params }: Props) => {
  const user = await getUserBySession();
  const { id } = await params;

  const post = await getPostById(id);
  if (!post?.ok) notFound();
  if (!post?.data) notFound();

  const postData = post.data;

  const allCommentsUsers = await getComments(postData.id);
  const commentsData = allCommentsUsers.data || [];

  return (
    <OverlayModal additionalClass="h-[90dvh] max-w-7xl z-50">
      <div className="flex flex-col lg:flex-row h-full">
        <div className="lg:w-3/5 lg:border-r lg:border-tertiary lg:overflow-y-auto">
          <PostCard 
            post={postData} 
            additionalClass="border-transparent" 
          />
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
    </OverlayModal>
  )
};

export default PostModal;