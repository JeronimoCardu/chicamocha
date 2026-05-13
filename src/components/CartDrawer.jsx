import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { calculateItemSubtotal, formatPrice } from "../utils/priceCalculator";
import {
  generateWhatsAppMessage,
  generateWhatsAppLink,
} from "../utils/whatsappMessage";
import { MdShoppingCart } from "react-icons/md";

export function CartDrawer({ isOpen, onClose }) {
  const { items, total, updateItem, removeItem } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    apellido: "",
    tipoEntrega: "retira",
    direccion: "",
    horario: "20:30",
  });

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateItem({ ...item, quantity: newQuantity });
    }
  };

  const handleFinalizeOrder = () => {
    const message = generateWhatsAppMessage(items, total, customerInfo);
    const link = generateWhatsAppLink(message);
    window.open(link, "_blank");
  };

  return (
    <div className={`fixed inset-0 z-40 ${isOpen ? "block" : "hidden"}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 w-full bg-[#131313] text-[#E5E2E1] overflow-y-auto border-t border-[#353534] pb-[80px]">
        <div className="p-6 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#353534]">
            <h2 className="text-xl font-bold text-[#FFB77D]">Carrito</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#FFB77D]"
            >
              ✕
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-8">
              <MdShoppingCart
                size={48}
                className="mx-auto text-gray-400 mb-4"
              />
              <p className="text-gray-400 text-lg">
                Todavía no seleccionaste ninguna hamburguesa
              </p>
              <p className="text-gray-500 text-sm mt-2">
                ¡Explora nuestro menú y agrega tus favoritas!
              </p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="border-b border-[#353534] py-4">
                  <div className="flex items-center mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-400">
                        ${formatPrice(item.totalPrice || 0)} c/u
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                        className="px-2 py-1 bg-[#353534] text-[#E5E2E1] rounded hover:bg-[#FFB77D] hover:text-black transition"
                      >
                        -
                      </button>
                      <span className="mx-2 text-[#FFB77D] font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-[#353534] text-[#E5E2E1] rounded hover:bg-[#FFB77D] hover:text-black transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {item.selectedExtras.length > 0 && (
                    <p className="text-sm text-green-400">
                      + {item.selectedExtras.map((e) => e.name).join(", ")}
                    </p>
                  )}
                  {item.removedIngredients.length > 0 && (
                    <p className="text-sm text-red-400">
                      - {item.removedIngredients.map((i) => i.name).join(", ")}
                    </p>
                  )}
                  {item.comment && (
                    <p className="text-sm text-blue-400">
                      Comentario: {item.comment}
                    </p>
                  )}
                  <p className="font-bold">
                    Subtotal: ${formatPrice(calculateItemSubtotal(item) || 0)}
                  </p>
                </div>
              ))}

              <div className="mt-4">
                <h3 className="font-bold text-lg text-[#FFB77D]">
                  Total: ${formatPrice(total || 0)}
                </h3>
              </div>

              <div className="mt-4 space-y-2 border-t border-[#353534] pt-4">
                <input
                  type="text"
                  placeholder="Apellido"
                  value={customerInfo.apellido}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      apellido: e.target.value,
                    })
                  }
                  className="w-full p-2 bg-[#201F1F] border border-[#353534] rounded text-[#E5E2E1] placeholder-gray-400"
                />

                <select
                  value={customerInfo.tipoEntrega}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      tipoEntrega: e.target.value,
                    })
                  }
                  className="w-full p-2 bg-[#201F1F] border border-[#353534] rounded text-[#E5E2E1]"
                >
                  <option value="retira">Retira</option>
                  <option value="delivery">Delivery</option>
                </select>

                {customerInfo.tipoEntrega === "delivery" && (
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={customerInfo.direccion}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        direccion: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-[#201F1F] border border-[#353534] rounded text-[#E5E2E1] placeholder-gray-400"
                  />
                )}

                <select
                  value={customerInfo.horario}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      horario: e.target.value,
                    })
                  }
                  className="w-full p-2 bg-[#201F1F] border border-[#353534] rounded text-[#E5E2E1]"
                >
                  <option value="20:30">20:30</option>
                  <option value="21:00">21:00</option>
                  <option value="21:30">21:30</option>
                  <option value="22:00">22:00</option>
                  <option value="22:30">22:30</option>
                  <option value="23:00">23:00</option>
                </select>
              </div>

              <button
                onClick={handleFinalizeOrder}
                className="w-full mt-4 bg-[#FFB77D] text-black font-bold py-3 rounded-xl"
              >
                Finalizar Pedido
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
