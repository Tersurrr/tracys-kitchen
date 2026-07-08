import type { CartLine, DeliveryType } from '@/types';
import { formatCurrency } from './format';

type BuildMessageArgs = {
  customerName: string;
  phone: string;
  deliveryType: DeliveryType;
  cart: CartLine[];
  overallNote?: string;
};

export function buildWhatsAppMessage({
  customerName,
  phone,
  deliveryType,
  cart,
  overallNote,
}: BuildMessageArgs): string {
  const lines: string[] = [];

  lines.push("Hello Tracy's Kitchen,");
  lines.push('');
  lines.push("I'd like to place a preorder.");
  lines.push('');
  lines.push('Customer Name:');
  lines.push(customerName);
  lines.push('');
  lines.push('Phone:');
  lines.push(phone);
  lines.push('');
  lines.push(deliveryType === 'pickup' ? 'Pickup' : 'Delivery');
  lines.push('');
  lines.push('Items');
  cart.forEach((line) => {
    lines.push(`${line.quantity} x ${line.menuItem.name}`);
    if (line.specialRequest) {
      lines.push(`  Note: ${line.specialRequest}`);
    }
  });
  lines.push('');

  const total = cart.reduce(
    (sum, l) => sum + l.quantity * l.menuItem.price,
    0
  );
  lines.push(`Total: ${formatCurrency(total)}`);

  if (overallNote) {
    lines.push('');
    lines.push('Special Request');
    lines.push(overallNote);
  }

  lines.push('');
  lines.push('Thank you.');

  return lines.join('\n');
}

export function buildWhatsAppLink(message: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '13012567848';
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}
