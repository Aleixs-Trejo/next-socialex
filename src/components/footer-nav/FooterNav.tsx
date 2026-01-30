import { NavList } from "./ui/NavList";

export const FooterNav = () => {
  return (
    <footer className="w-full block md:hidden">
      <nav className="w full fixed bottom-0 inset-x-0 h-header bg-black z-10 border-t border-zinc-800">
        <ul className="h-full flex">
          <NavList />
        </ul>
      </nav>
    </footer>
  );
};