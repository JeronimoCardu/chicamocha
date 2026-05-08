import burgers from "../data/burgers.json";
import { BurgerCard } from "./BurgerCard";

export function MenuSection() {
  return (
    <section className="px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-black uppercase text-[#FFB77D]">
          Nuestro menú
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {burgers.map((burger, index) => (
          <BurgerCard key={index} burger={burger} />
        ))}
      </div>
    </section>
  );
}
