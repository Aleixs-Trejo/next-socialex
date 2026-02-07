import { OverlayModal } from "@/components";
import { FormNewPost } from "./ui/FormNewPost";

const NewPostModal = () => {
  return (
    <OverlayModal>
      <div className="flex flex-col gap-4 overflow-hidden">
        <h2 className="text-center text-white text-xl">Nueva publicación</h2>
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <FormNewPost />
          </div>
        </div>
      </div>
    </OverlayModal>
  );
};

export default NewPostModal;