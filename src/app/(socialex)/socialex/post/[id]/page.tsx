import { getUserById } from "@/actions";
import { getPostById } from "@/actions";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const PostByIdPage = async ({ params }: Props) => {
  const { id } = await params;

  const post = await getPostById(id);
  if (!post?.ok) notFound();
  if (!post?.data) notFound();
  const user = await getUserById(post?.data?.userId);

  return (
    <div className="w-9/10 max-w-3xl mx-auto overflow-hidden py-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Hola {user?.data?.name?.split(" ")[0]}</h2>
        <h2 className="text-2xl font-semibold">{post.data?.content}</h2>
        <h2 className="text-2xl font-semibold">{post.data?.media[0]?.url}</h2>
      </div>
    </div>
  );
};

export default PostByIdPage;