import { OverlayModal } from "@/components";
import { EditProfileForm } from "./ui/EditProfileForm";
import { redirect } from "next/navigation";
import { getUserBySession } from "@/actions";

const EditProfilePage = async () => {
  const user = await getUserBySession();
  if (!user) redirect("/auth/login");

  const defaultValues = {
    name: user.name || '',
    description: user.description || '',
    profession: user.profession || '',
    birthdate: user.birthdate?.toISOString().split('T')[0] || '',
    image: user.image || '',
  };

  return (
    <OverlayModal additionalClass="max-w-xl">
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-white text-xl">Editar perfil</h2>
        <div className="w-full flex flex-col gap-4">
          <EditProfileForm defaultValues={defaultValues} />
        </div>
      </div>
    </OverlayModal>
  )
};

export default EditProfilePage;