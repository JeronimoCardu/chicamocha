import React, { createContext, useContext, useReducer, useEffect } from "react";

// Estado inicial del carrito
const initialState = {
  items: [],
  total: 0,
};

// Reducer para manejar acciones del carrito
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "CLEAR_CART":
      return initialState;
    case "LOAD_CART":
      return action.payload;
    default:
      return state;
  }
}

// Contexto
const CartContext = createContext();

// Provider
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Calcular total
  const total = state.items.reduce(
    (sum, item) => sum + item.totalPrice * item.quantity,
    0,
  );

  // Persistir en localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("chicaMochaCart");
    if (savedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chicaMochaCart", JSON.stringify(state));
  }, [state]);

  // Funciones para manipular el carrito
  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const updateItem = (item) => {
    dispatch({ type: "UPDATE_ITEM", payload: item });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total,
        addItem,
        updateItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar el contexto
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
