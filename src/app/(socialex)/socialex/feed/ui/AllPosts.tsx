import { getAllPostsPaginated } from "@/actions";
import { EmptyData } from "@/components";
import { PostCard } from "@/components";
import { Post } from "@/interfaces";

export const AllPosts = async () => {
  const posts = await getAllPostsPaginated();

  if (!posts?.ok) return <EmptyData message="Error en la BD" />;
  if (!posts?.data) return <EmptyData message="Error al cargar publicaciones" />;
  if (!posts?.data?.length) return <EmptyData message="No hay publicaciones" />;

  const postsData = posts.data as Post[];

  return (
    <div className="flex flex-col gap-4">
      {postsData.map(post => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
};
