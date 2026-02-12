import { getAllPostsPaginated } from "@/actions";
import { EmptyData } from "@/components";
import { PostCard } from "@/components";

export const AllPosts = async () => {
  const posts = await getAllPostsPaginated();

  if (!posts?.ok) return <EmptyData message="Error en la BD" />;
  if (!posts?.data) return <EmptyData message="Error al cargar publicaciones" />;
  if (!posts?.data?.length) return <EmptyData message="No hay publicaciones" />;

  return (
    <section className="flex flex-col gap-4">
      {posts.data.map(post => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </section>
  );
};
