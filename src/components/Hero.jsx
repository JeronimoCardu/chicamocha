export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1400&auto=format&fit=crop"
        alt="Burger hero"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />

      <div className="relative space-y-10 z-10 text-center px-6">
        <h2 className="text-5xl font-black uppercase text-[#FFB77D] leading-tight">
          Smash burgers hechas como deben ser.
        </h2>

        <p className="mt-6 text-lg text-gray-300">
          Las mejores hamburguesas de la zona
        </p>

        <a
          href="#menu-section"
          className="mt-8 bg-[#FFB77D] text-black font-bold uppercase px-8 py-4 rounded-xl active:scale-95 transition"
        >
          Pedir ahora
        </a>
      </div>
    </section>
  );
}
