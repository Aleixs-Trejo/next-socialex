import { getPostById } from "@/actions";
import { OverlayModal } from "@/components";
import { FormEditPost } from "./ui/FormEditPost";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const EditPostModal = async ({ params }: Props) => {
  const { id } = await params;
  const post = await getPostById(id);

  const postId = post.data?.id;
  if (!postId) redirect('/socialex/feed');

  const postContent = post.data?.content || '';

  const defaultValues = {
    content: postContent,
  };

  return (
    <OverlayModal additionalClass="max-h-[80dvh] max-w-3xl">
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-white text-xl px-3">Editar publicación</h2>
        <div className="flex flex-col gap-4">
          <FormEditPost postId={postId} content={postContent} defaultValues={defaultValues} media={post.data?.media} />
        </div>
      </div>
    </OverlayModal>
  );
};

export default EditPostModal;