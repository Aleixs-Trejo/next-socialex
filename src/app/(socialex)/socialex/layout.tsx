import { auth } from "@/auth.config";
import { AsideNav, Copyright, FooterNav, HeaderNav } from "@/components";

const SocialexLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <div className="w-full min-h-dvh flex flex-col">
      <HeaderNav session={session} />
      <AsideNav />
      <main className="min-h-main pb-16 md:pb-0 flex flex-col mt-16 main md:ml-auto transition-all duration-300">
        <div className="flex-1">
          <div className="w-full">
            {children}
          </div>
        </div>
        <div className="w-full max-w-3xl mx-auto">
          <Copyright />
        </div>
      </main>
      <FooterNav />
    </div>
  );
};

export default SocialexLayout;