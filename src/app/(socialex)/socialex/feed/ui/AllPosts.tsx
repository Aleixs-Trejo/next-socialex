import { getAllPostsPaginated } from "@/actions";
import { EmptyData, ImageCustom } from "@/components";
import { PostCard } from "./PostCard";

export const AllPosts = async () => {
  const posts = await getAllPostsPaginated();

  if (!posts?.ok) return <div>Error</div>;
  if (!posts?.data) return <div>Error</div>;
  if (!posts?.data?.length) return <EmptyData message="No hay publicaciones" />;

  return (
    <section className="flex flex-col gap-4">
      {posts.data.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
};
