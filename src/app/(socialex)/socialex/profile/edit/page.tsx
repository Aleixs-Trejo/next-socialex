import { getUserBySession } from "@/actions";
import { redirect } from "next/navigation";
import { EditProfileForm } from "../../@modal/(.)profile/edit/ui/EditProfileForm";
import { BtnBack } from "@/components/btn-back/BtnBack";

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
    <div className="w-9/10 max-w-3xl mx-auto py-12 overflow-hidden relative">
      <BtnBack additionalClass="absolute top-4 left-0" />
      <div className="flex flex-col gap-4 overflow-hidden">
        <h2 className="text-center text-white text-xl">Editar perfil</h2>
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <EditProfileForm defaultValues={defaultValues} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;