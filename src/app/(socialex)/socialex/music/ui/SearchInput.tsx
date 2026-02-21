import { IoIosSearch } from "react-icons/io";

export const SearchInput = () => {
  return (
    <div className="relative">
      <label htmlFor="input-search" className="w-full flex items-center border-b border-primary cursor-pointer">
        <IoIosSearch size={20} className="text-primary" />
        <input
          type="text"
          id="input-search"
          className="w-full h-10 pl-4 text-sm text-white bg-transparent border-none outline-none"
          placeholder="Busca lo que quieras"
        />
      </label>
    </div>
  );
};