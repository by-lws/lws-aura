// Sales are live. Keep the switch explicit so a future collection can be gated again safely.
export const SALES_ARE_LIVE = true;

export const productSizes = ['30 мл', '50 мл', '100 мл'] as const;
export type ProductSize = (typeof productSizes)[number];

export const productVariants: Record<ProductSize, { price: number; role: string }> = {
  '30 мл': { price: 4_900, role: 'ВХОД В БРЕНД' },
  '50 мл': { price: 7_900, role: 'ГЛАВНЫЙ ПРОДУКТ' },
  '100 мл': { price: 11_900, role: 'ЛУЧШИЙ VALUE / PREMIUM' },
};

export function formatPrice(price: number) {
  return `${new Intl.NumberFormat('ru-RU').format(price).replace(/\u00a0/g, ' ')} ₽`;
}

export function areSalesOpen() {
  return SALES_ARE_LIVE;
}
