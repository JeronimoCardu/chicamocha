export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 border-b border-[#353534] bg-[#131313]/90 backdrop-blur z-50 flex items-center justify-between px-4">
      <img src="./logo.jpg" alt="Logo" className="h-10 w-auto object-contain" />
      <h1 className="text-2xl uppercase tracking-tight font-black text-[#FFB77D]">
        CHICHA MOCHA
      </h1>
    </header>
  );
}
