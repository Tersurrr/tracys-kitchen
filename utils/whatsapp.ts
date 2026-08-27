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
  lines.push(customerName.trim());
  lines.push('');
  lines.push('Phone:');
  lines.push(phone.trim());
  lines.push('');
  lines.push('Fulfillment:');
  lines.push(deliveryType === 'pickup' ? 'Pickup' : 'Delivery');
  lines.push('');
  lines.push('Items:');

  cart.forEach((line) => {
    const unitPrice = Number(line.menuItem.price);
    const lineTotal = line.quantity * unitPrice;
    lines.push(
      `${line.quantity} x ${line.menuItem.name} - ${formatCurrency(unitPrice)} each (${formatCurrency(lineTotal)})`
    );
    if (line.specialRequest?.trim()) {
      lines.push(`  Note: ${line.specialRequest.trim()}`);
    }
  });
  lines.push('');

  const total = cart.reduce(
    (sum, line) => sum + line.quantity * Number(line.menuItem.price),
    0
  );
  lines.push(`Total: ${formatCurrency(total)}`);

  if (overallNote?.trim()) {
    lines.push('');
    lines.push('Special Request:');
    lines.push(overallNote.trim());
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
