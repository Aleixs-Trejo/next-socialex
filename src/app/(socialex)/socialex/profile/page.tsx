import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { LogoutBtn } from "./ui/LogoutBtn";
import { ImageCustom } from "@/components";

const ProfilePage = async () => {
  const session = await auth();
  console.log('session profile: ', session);
  if (!session?.user) redirect('/auth/login');
  return (
    <div className="w-9/10 max-w-3xl mx-auto">
      <div className="flex flex-col gap-4">
        <h2 className="text-title-main">Profile Page</h2>
        <div className="flex flex-col gap-2">
          <ImageCustom
            src={session?.user?.image || undefined}
            alt="Avatar"
            width={160}
            height={160}
            className="rounded-full mx-auto"
          />
          <pre className="text-start text-wrap wrap-break-word">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
        <LogoutBtn />
      </div>
    </div>
  );
};

export default ProfilePage;