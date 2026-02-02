import { getAllPostsPaginated } from "@/actions";
import { EmptyData } from "@/components";

export const AllPosts = async () => {
  const posts = await getAllPostsPaginated();

  if (!posts?.ok) return <div>Error</div>;
  if (!posts?.data) return <div>Error</div>;
  if (!posts?.data?.length) return (<EmptyData message="No hay publicaciones" />);

  return (
    <div>All Posts</div>
  );
};