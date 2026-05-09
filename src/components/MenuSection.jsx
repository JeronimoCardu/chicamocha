import burgers from "../data/burgers.json";
import { BurgerCard } from "./BurgerCard";

export function MenuSection({ onOpenModal }) {
  return (
    <section id="menu-section" className="px-4 py-12">
      <h3 className="text-3xl font-black my-10 uppercase text-[#FFB77D]">
        Nuestro menú
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {burgers.map((burger, index) => (
          <BurgerCard key={index} burger={burger} onOpenModal={onOpenModal} />
        ))}
      </div>
    </section>
  );
}
