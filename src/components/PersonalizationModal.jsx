import React, { useState } from "react";
import { extras } from "../data/customization";
import { formatPrice } from "../utils/priceCalculator";

const normalizeId = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const parseBurgerIngredients = (desc) => {
  if (!desc || desc.trim() === "---") return [];

  const cleaned = desc
    .replace(/\s+y\s+/gi, ", ")
    .replace(/nuestra\s+/gi, "")
    .replace(/\.+$/, "")
    .trim();

  return cleaned
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => ({
      id: normalizeId(part),
      name: part.charAt(0).toUpperCase() + part.slice(1),
    }));
};

export function PersonalizationModal({ burger, onClose, onAddToCart }) {
  const [selectedExtras, setSelectedExtras] = useState({});
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Parsear el precio base removiendo el símbolo $ y puntos
  const basePrice = parseFloat(burger.price.replace(/[$.]/g, "")) || 0;
  const extrasTotal = Object.entries(selectedExtras).reduce(
    (sum, [id, qty]) => {
      const extra = extras.find((e) => e.id === id);
      return sum + (extra ? extra.price * qty : 0);
    },
    0,
  );
  const totalPrice = basePrice + extrasTotal;

  const handleExtraIncrease = (extraId) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [extraId]: (prev[extraId] || 0) + 1,
    }));
  };

  const handleExtraDecrease = (extraId) => {
    setSelectedExtras((prev) => {
      const newQty = (prev[extraId] || 0) - 1;
      if (newQty <= 0) {
        const newExtras = { ...prev };
        delete newExtras[extraId];
        return newExtras;
      }
      return { ...prev, [extraId]: newQty };
    });
  };

  const removableIngredients = parseBurgerIngredients(burger.desc);

  const handleIngredientToggle = (ingredient) => {
    setRemovedIngredients((prev) =>
      prev.find((i) => i.id === ingredient.id)
        ? prev.filter((i) => i.id !== ingredient.id)
        : [...prev, ingredient],
    );
  };

  const handleAddToCart = () => {
    const extrasArray = Object.entries(selectedExtras).map(([id, qty]) => {
      const extra = extras.find((e) => e.id === id);
      return { ...extra, quantity: qty };
    });
    const item = {
      id: `${burger.name}-${Date.now()}`, // ID único
      name: burger.name,
      basePrice: burger.price,
      totalPrice,
      quantity,
      image: burger.image,
      selectedExtras: extrasArray,
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
        <div className="px-6 py-20 max-w-2xl mx-auto">
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
            <h3 className="font-semibold mb-2 text-[#FFB77D]">
              Agregar ingredientes
            </h3>
            <p className="text-sm text-[#E5E2E1] mb-3">
              Selecciona los ingredientes adicionales disponibles para esta
              hamburguesa.
            </p>
            {extras.map((extra) => (
              <div
                key={extra.id}
                className="flex items-center justify-between py-2 hover:bg-[#201F1F] px-2 rounded"
              >
                <span>
                  {extra.name} (+${formatPrice(extra.price)})
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleExtraDecrease(extra.id)}
                    className="px-3 py-1 bg-[#353534] text-[#E5E2E1] rounded hover:bg-[#FFB77D] hover:text-black transition"
                  >
                    -
                  </button>
                  <span className="mx-3 text-[#FFB77D] font-bold min-w-5 text-center">
                    {selectedExtras[extra.id] || 0}
                  </span>
                  <button
                    onClick={() => handleExtraIncrease(extra.id)}
                    className="px-3 py-1 bg-[#353534] text-[#E5E2E1] rounded hover:bg-[#FFB77D] hover:text-black transition"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Ingredientes removibles */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-[#FFB77D]">
              Quitar ingredientes
            </h3>
            <p className="text-sm text-[#E5E2E1] mb-3">
              Selecciona los ingredientes que ya tiene esta hamburguesa.
            </p>
            {removableIngredients.length === 0 ? (
              <p className="text-sm text-[#E5E2E1]">
                Esta hamburguesa no tiene ingredientes removibles detectados.
              </p>
            ) : (
              removableIngredients.map((ing) => (
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
              ))
            )}
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
              ${formatPrice(totalPrice * quantity)}
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
