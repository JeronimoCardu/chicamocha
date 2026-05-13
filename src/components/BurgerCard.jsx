import { formatPrice } from "../utils/priceCalculator";

export function BurgerCard({ burger, onOpenModal }) {
  const priceNumber =
    parseFloat(burger.price.replace("$", "").replace(".", "")) || 0;
  const formattedPrice = `$${formatPrice(priceNumber)}`;

  return (
    <div
      className={`overflow-hidden rounded-3xl border transition hover:border-[#FFB77D]
        ${burger.special ? "bg-[#FFB77D] text-black border-[#FFB77D]" : "bg-[#201F1F] border-[#353534]"}`}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={burger.image}
          alt={burger.name}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />

        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-lg font-bold ${burger.special ? "bg-black text-[#FFB77D]" : "bg-black/70 text-[#FFB77D]"}`}
        >
          {formattedPrice}
        </div>

        {burger.special && (
          <div className="absolute top-3 left-3 bg-black text-[#FFB77D] text-xs font-bold px-3 py-1 rounded-lg uppercase">
            Special Edition
          </div>
        )}
      </div>

      <div className="p-5">
        <h4 className="text-2xl font-black uppercase">{burger.name}</h4>

        <p
          className={`mt-2 text-sm leading-relaxed ${burger.special ? "text-black/80" : "text-gray-400"}`}
        >
          {burger.desc}
        </p>

        <button
          onClick={() => onOpenModal(burger)}
          className={`w-full mt-5 py-3 rounded-xl font-bold uppercase transition active:scale-95 ${burger.special ? "bg-black text-[#FFB77D]" : "border border-[#FFB77D] text-[#FFB77D] hover:bg-[#FFB77D] hover:text-black"}`}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
