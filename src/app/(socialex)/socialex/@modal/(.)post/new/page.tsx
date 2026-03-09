import { OverlayModal } from "@/components";
import { FormNewPost } from "./ui/FormNewPost";
import { connection } from "next/server";

const NewPostModal = async () => {
  await connection();
  return (
    <OverlayModal additionalClass="max-h-[80dvh] max-w-3xl">
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-white text-xl px-3">Nueva publicación</h2>
        <div className="flex flex-col gap-4 py-4">
          <div className="w-full">
            <FormNewPost />
          </div>
        </div>
      </div>
    </OverlayModal>
  );
};

export default NewPostModal;