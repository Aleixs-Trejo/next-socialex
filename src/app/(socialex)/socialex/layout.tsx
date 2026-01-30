import { AsideNav, FooterNav, HeaderNav } from "@/components";

const SocialexLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-dvh flex flex-col">
      <HeaderNav />
      <AsideNav />
      <main className="min-h-main pb-16 md:min-h-main flex flex-col mt-16 main md:ml-auto transition-all duration-300">
        <div className="text-center flex-1 py-2">
          <div className="w-full">
            {children}
          </div>
        </div>
      </main>
      <FooterNav />
    </div>
  );
};

export default SocialexLayout;