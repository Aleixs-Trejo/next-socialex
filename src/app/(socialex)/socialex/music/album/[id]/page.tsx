import { getAlbum } from "@/lib/spotify/get-albums";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const AlbumPage = async ({ params }: Props) => {
  const { id } = await params;
  const result = await getAlbum(id);
  if (!result.ok) notFound();

  return (
    <h2 className="text-title-main">Album Page</h2>
  )
}

export default AlbumPage;