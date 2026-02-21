export const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full border-t border-gray-700 h-header flex items-center justify-center overflow-hidden select-none">
      <p className={`text-center text-sm text-gray-400 min-w-55`}>
        &copy; {currentYear} Socialex. Ningún derecho reservado.
      </p>
    </div>
  );
};