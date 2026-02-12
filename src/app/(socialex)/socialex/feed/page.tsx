
import { Title } from "@/components";
import { NewPostBanner } from "./ui/NewPostBanner";
import { AllPosts } from "./ui/AllPosts";
import { getServerSession } from "@/lib/get-server-session";

export const metadata = {
  title: "Inicio | Socialex"
};

const FeedPage = async () => {

  const session = await getServerSession();

  return (
    <div className="w-9/10 max-w-3xl mx-auto overflow-hidden py-8">
      <div className="flex flex-col gap-4">
        {
          session?.user && (
            <NewPostBanner session={session} />
          )
        }
        <Title title="Novedades" subtitle="Explora lo último" />
        <AllPosts />
      </div>
    </div>
  );
};

export default FeedPage;