import React, { useState } from "react";
import { MdRestaurantMenu, MdShoppingCart } from "react-icons/md";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "../context/CartContext";

export function MobileNav({ onCloseModal }) {
  const [showCart, setShowCart] = useState(false);
  const { items } = useCart();

  const handleMenuClick = () => {
    setShowCart(false);
    if (onCloseModal) onCloseModal();
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCartClick = () => {
    if (onCloseModal) onCloseModal();
    setShowCart(true);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full bg-[#201F1F] border-t border-[#353534] flex justify-around items-center py-3 z-50">
        <button
          onClick={handleMenuClick}
          className={`flex flex-col items-center ${showCart ? "text-gray-500" : "text-[#FFB77D]"}`}
        >
          <MdRestaurantMenu size={22} />
          <span className="text-xs mt-1 uppercase font-bold">Menu</span>
        </button>

        <button
          onClick={handleCartClick}
          className={`flex flex-col items-center relative ${showCart ? "text-[#FFB77D]" : "text-gray-500"}`}
        >
          <MdShoppingCart size={22} />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#FFB77D] text-black rounded-full w-4 h-4 text-xs flex items-center justify-center">
              {items.length}
            </span>
          )}
          <span className="text-xs mt-1 uppercase font-bold">Cart</span>
        </button>
      </nav>

      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
}
