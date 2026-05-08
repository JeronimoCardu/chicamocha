export function Footer() {
  return (
    <footer className="border-t border-[#353534] bg-[#0E0E0E] px-6 py-12 pb-28">
      <div className="text-center">
        <h5 className="text-3xl font-black uppercase text-[#FFB77D]">
          CHICA MOCHA
        </h5>
        <p className="mt-3 text-gray-500 text-sm">© 2026 CHICA MOCHA.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-10 text-center md:grid-cols-3">
        <div>
          <h6 className="uppercase font-bold text-[#FFB77D] mb-2">Ubicación</h6>
          <p className="text-gray-400">
            Belgrano y Maipu
            <br />
            San Andrés de Giles / Buenos Aires
          </p>
        </div>

        <div>
          <h6 className="uppercase font-bold text-[#FFB77D] mb-2">Horarios</h6>
          <p className="text-gray-400">Lun - Dom: 20:00 - 23:00</p>
        </div>

        <a href="https://www.instagram.com/chicamochaa" target="_blank" rel="noopener noreferrer">
          <h6 className="uppercase font-bold text-[#FFB77D] mb-2">Instagram</h6>
          <p className="text-gray-400">@chicamochaa</p>
        </a>
      </div>
    </footer>
  );
}
