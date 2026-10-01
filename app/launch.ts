export const SALES_LAUNCH_AT = '2027-02-20T00:00:00+03:00';
export const SALES_LAUNCH_LABEL = '20.02.2027';
export const SALES_LAUNCH_TIMESTAMP = Date.parse(SALES_LAUNCH_AT);

export const productSizes = ['30 мл', '50 мл', '100 мл'] as const;
export type ProductSize = (typeof productSizes)[number];

export function areSalesOpen(now = Date.now()) {
  return now >= SALES_LAUNCH_TIMESTAMP;
}
