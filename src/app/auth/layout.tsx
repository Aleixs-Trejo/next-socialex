import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { Copyright } from "@/components";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <section className="w-full min-h-dvh flex flex-col items-center justify-center">
      <div className="w-full py-8 sm:py-12 flex-1 flex items-center justify-center overflow-hidden text-white">
        <div className="p-6 flex flex-col gap-5 w-9/10 max-w-xl mx-auto rounded-lg border border-gray-700 overflow-hidden">
          {children}
        </div>
      </div>
      <div className="w-9/10 mx-auto max-w-7xl mt-auto">
        <Copyright />
      </div>
    </section>
  )
};

export default AuthLayout;