import React, { useState } from "react";
import { extras, removableIngredients } from "../data/customization";
import { calculateItemPrice } from "../utils/priceCalculator";

export function PersonalizationModal({ burger, onClose, onAddToCart }) {
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Parsear el precio base removiendo el símbolo $
  const basePrice = parseFloat(burger.price.replace("$", "")) || 0;
  const totalPrice = calculateItemPrice(basePrice, selectedExtras);

  const handleExtraToggle = (extra) => {
    setSelectedExtras((prev) =>
      prev.find((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra],
    );
  };

  const handleIngredientToggle = (ingredient) => {
    setRemovedIngredients((prev) =>
      prev.find((i) => i.id === ingredient.id)
        ? prev.filter((i) => i.id !== ingredient.id)
        : [...prev, ingredient],
    );
  };

  const handleAddToCart = () => {
    const item = {
      id: `${burger.name}-${Date.now()}`, // ID único
      name: burger.name,
      basePrice: burger.price,
      totalPrice,
      quantity,
      image: burger.image,
      selectedExtras,
      removedIngredients,
      comment,
    };
    onAddToCart(item);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-40 ${burger ? "block" : "hidden"}`}
      onClick={onClose}
    >
      <div
        className="absolute bottom-0 left-0 right-0 top-0 w-full bg-[#131313] text-[#E5E2E1] overflow-y-auto border-t border-[#353534] pb-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#353534]">
            <h2 className="text-xl font-bold text-[#FFB77D]">
              Personalizar {burger.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#FFB77D]"
            >
              ✕
            </button>
          </div>

          {/* Extras */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-[#FFB77D]">Extras</h3>
            {extras.map((extra) => (
              <label
                key={extra.id}
                className="flex items-center justify-between py-2 hover:bg-[#201F1F] px-2 rounded"
              >
                <span>
                  {extra.name} (+${extra.price})
                </span>
                <input
                  type="checkbox"
                  checked={selectedExtras.some((e) => e.id === extra.id)}
                  onChange={() => handleExtraToggle(extra)}
                  className="accent-[#FFB77D]"
                />
              </label>
            ))}
          </div>

          {/* Ingredientes removibles */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-[#FFB77D]">
              Quitar ingredientes
            </h3>
            {removableIngredients.map((ing) => (
              <label
                key={ing.id}
                className="flex items-center justify-between py-2 hover:bg-[#201F1F] px-2 rounded"
              >
                <span>{ing.name}</span>
                <input
                  type="checkbox"
                  checked={removedIngredients.some((i) => i.id === ing.id)}
                  onChange={() => handleIngredientToggle(ing)}
                  className="accent-[#FFB77D]"
                />
              </label>
            ))}
          </div>

          {/* Comentario */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-[#FFB77D]">Comentario</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ej: bien cocida, sin sal..."
              className="w-full p-2 bg-[#201F1F] border border-[#353534] rounded text-[#E5E2E1] placeholder-gray-400"
              rows={3}
            />
          </div>

          {/* Cantidad y precio */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 bg-[#353534] text-[#E5E2E1] rounded hover:bg-[#FFB77D] hover:text-black transition"
              >
                -
              </button>
              <span className="mx-3 text-[#FFB77D] font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 bg-[#353534] text-[#E5E2E1] rounded hover:bg-[#FFB77D] hover:text-black transition"
              >
                +
              </button>
            </div>
            <span className="font-bold text-[#FFB77D]">
              ${(totalPrice * quantity).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-[#FFB77D] text-black font-bold py-3 rounded-xl"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
