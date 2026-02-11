import { BtnBack } from "@/components/btn-back/BtnBack";
import { FormNewPost } from "../../@modal/(.)post/new/ui/FormNewPost";

const NewPostPage = () => {
  return (
    <div className="w-9/10 max-w-3xl mx-auto py-12 overflow-hidden relative">
      <BtnBack additionalClass="absolute top-4 left-0" />
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-white text-xl">Nueva publicación</h2>
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <FormNewPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostPage;