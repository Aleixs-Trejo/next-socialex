import { FormNewPost } from "../../@modal/(.)post/new/ui/FormNewPost";

const NewPostPage = () => {
  return (
    <div className="w-9/10 max-w-3xl mx-auto py-12">
      <div className="flex flex-col gap-4 overflow-hidden">
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