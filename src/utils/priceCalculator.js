// Función para calcular el precio total de un item
export function calculateItemPrice(basePrice, selectedExtras) {
  const extrasTotal = selectedExtras.reduce(
    (sum, extra) => sum + extra.price,
    0,
  );
  return basePrice + extrasTotal;
}

// Función para calcular el subtotal de un item (precio total * cantidad)
export function calculateItemSubtotal(item) {
  const price = item.totalPrice || 0;
  const quantity = item.quantity || 1;
  return price * quantity;
}

// Función para calcular el total del carrito
export function calculateCartTotal(items) {
  return items.reduce((sum, item) => sum + calculateItemSubtotal(item), 0);
}
