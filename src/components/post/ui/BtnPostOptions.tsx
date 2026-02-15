"use client";

import { useRef, useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export const BtnPostOptions = ({ children }: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setShowOptions(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef}>
      <button className="btn-post-card-options w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-secondary transition-colors duration-300 z-60" onClick={() => setShowOptions(!showOptions)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="select-none"
        >
          <path
            fill="currentColor"
            d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m-6 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4m12 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
          />
        </svg>
      </button>
      {showOptions && children}
    </div>
  );
};
