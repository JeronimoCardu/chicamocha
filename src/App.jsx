import "./App.css";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MenuSection } from "./components/MenuSection";
import { Footer } from "./components/Footer";
import { MobileNav } from "./components/MobileNav";

export default function App() {
  return (
    <CartProvider>
      <div className="bg-[#131313] text-[#E5E2E1] min-h-screen font-sans">
        <Header />
        <Hero />
        <MenuSection />
        <Footer />
        <MobileNav />
      </div>
    </CartProvider>
  );
}
