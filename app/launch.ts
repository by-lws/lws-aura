export const SALES_LAUNCH_AT = '2027-02-20T00:00:00+03:00';
export const SALES_LAUNCH_LABEL = '20.02.2027';
export const SALES_LAUNCH_TIMESTAMP = Date.parse(SALES_LAUNCH_AT);

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

export function areSalesOpen(now = Date.now()) {
  return now >= SALES_LAUNCH_TIMESTAMP;
}
