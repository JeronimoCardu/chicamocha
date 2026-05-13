// Función para generar mensaje de WhatsApp
import { formatPrice } from "./priceCalculator";

export function generateWhatsAppMessage(cartItems, total, customerInfo) {
  let message = "NUEVO PEDIDO - CHICA MOCHA\n\n";

  cartItems.forEach((item) => {
    message += `• x${item.quantity} ${item.name} \n`;
    if (item.selectedExtras.length > 0) {
      item.selectedExtras.forEach((extra) => {
        message += `  + ${extra.name}\n`;
      });
    }
    if (item.removedIngredients.length > 0) {
      item.removedIngredients.forEach((ing) => {
        message += `  - ${ing.name}\n`;
      });
    }
    if (item.comment) {
      message += `  \nComentario: ${item.comment}\n`;
    }
    message += "\n";
  });

  message += `TOTAL: $${formatPrice(total)}\n\n`;
  message += "Cliente:\n";
  message += `- Apellido: ${customerInfo.apellido || ""}\n`;
  message += `- Tipo de entrega: ${customerInfo.tipoEntrega || ""}\n`;
  message += `- Dirección: ${customerInfo.direccion || ""}\n`;
  message += `- Horario: ${customerInfo.horario || ""}\n`;
  message += `- Medio de pago: ${customerInfo.medioPago || ""}\n`;

  message += "\n Si abonas por tranferencia por favor enviar COMPROBANTE";
  message += "\n alias: leosko \n";
  message += "\n¡Gracias por tu pedido!";

  return message;
}

// Función para generar link de WhatsApp
export function generateWhatsAppLink(message, phoneNumber = "2325471890") {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
