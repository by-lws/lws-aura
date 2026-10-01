import { areSalesOpen, productSizes, productVariants, type ProductSize } from '../../../launch';
import { YooKassaConfigurationError, YooKassaRequestError, createYooKassaPayment } from '../../../lib/yookassa';

type CartLine = { size: ProductSize; quantity: number };

function json(body: Record<string, string>, status: number) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

function priceInKopecks(size: ProductSize) {
  return productVariants[size].price * 100;
}

function parseCart(body: unknown): CartLine[] | null {
  if (!body || typeof body !== 'object' || !Array.isArray((body as { lines?: unknown }).lines)) return null;

  const lines: CartLine[] = [];
  for (const item of (body as { lines: unknown[] }).lines) {
    if (!item || typeof item !== 'object') return null;
    const { size, quantity } = item as { size?: unknown; quantity?: unknown };
    if (typeof size !== 'string' || !productSizes.includes(size as ProductSize)) return null;
    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) return null;
    lines.push({ size: size as ProductSize, quantity });
  }

  return lines.length > 0 && lines.length <= productSizes.length ? lines : null;
}

export async function POST(request: Request) {
  if (!areSalesOpen()) {
    return json({ error: 'Оплата откроется 20 февраля 2027 года.' }, 403);
  }

  // This is deliberately a second switch: a secret key alone must never make the site charge cards.
  if (process.env.YOO_KASSA_PAYMENTS_ENABLED !== 'true') {
    return json({ error: 'Оплата ещё проходит финальную настройку.' }, 503);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Не удалось прочитать корзину.' }, 400);
  }

  const lines = parseCart(body);
  if (!lines) return json({ error: 'Проверьте состав корзины.' }, 400);

  let total = 0;
  for (const line of lines) {
    const price = priceInKopecks(line.size);
    total += price * line.quantity;
  }

  const siteUrl = process.env.SITE_URL?.replace(/\/$/, '') || new URL(request.url).origin;
  const description = `LWS Aura · LoveWarSecret · ${lines.map((line) => `${line.size} × ${line.quantity}`).join(', ')}`;

  try {
    const payment = await createYooKassaPayment({
      amountKopecks: total,
      description,
      returnUrl: `${siteUrl}/checkout`,
    });
    return Response.json(payment, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof YooKassaConfigurationError) return json({ error: error.message }, 503);
    if (error instanceof YooKassaRequestError) return json({ error: error.message }, 502);
    return json({ error: 'Сервис оплаты временно недоступен.' }, 502);
  }
}
