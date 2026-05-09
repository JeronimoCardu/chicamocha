import "./App.css";
import { useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MenuSection } from "./components/MenuSection";
import { Footer } from "./components/Footer";
import { MobileNav } from "./components/MobileNav";
import { PersonalizationModal } from "./components/PersonalizationModal";

function AppContent() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBurger, setSelectedBurger] = useState(null);
  const { addItem } = useCart();

  const handleOpenModal = (burger) => {
    setSelectedBurger(burger);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBurger(null);
  };

  const handleAddToCart = (item) => {
    addItem(item);
    handleCloseModal();
  };

  return (
    <div className="bg-[#131313] text-[#E5E2E1] min-h-screen font-sans">
      <Header />
      <Hero />
      <MenuSection onOpenModal={handleOpenModal} />
      <Footer />
      <MobileNav onCloseModal={handleCloseModal} />
      {showModal && (
        <PersonalizationModal
          burger={selectedBurger}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
