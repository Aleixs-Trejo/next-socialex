export const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full border-t border-gray-700">
      <p className={`text-center text-base text-gray-400 py-8 overflow-hidden`}>
        &copy; {currentYear} Socialex. Ningún derecho reservado.
      </p>
    </div>
  );
};