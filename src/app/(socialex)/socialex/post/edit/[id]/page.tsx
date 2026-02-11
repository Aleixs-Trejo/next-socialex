import { BtnBack } from "@/components/btn-back/BtnBack";
import { FormEditPost } from "../../../@modal/(.)post/edit/[id]/ui/FormEditPost";
import { getPostById } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const EditPostPage = async ({ params }: Props) => {
  const { id } = await params;
  const post = await getPostById(id);

  const postId = post.data?.id;
  if (!postId) redirect('/socialex/feed');
  console.log('post: ', post.data);

  const postContent = post.data?.content || '';

  const defaultValues = {
    content: postContent,
  };

  return (
    <div className="w-9/10 max-w-3xl mx-auto py-12 overflow-hidden relative">
      <BtnBack additionalClass="absolute top-4 left-0" />
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-white text-xl px-3">Editar publicación</h2>
        <div className="flex flex-col gap-4">
          <FormEditPost postId={postId} content={postContent} defaultValues={defaultValues} />
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;