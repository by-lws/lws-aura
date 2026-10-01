type YooKassaConfig = {
  shopId: string;
  secretKey: string;
};

type PaymentInput = {
  amountKopecks: number;
  description: string;
  returnUrl: string;
};

type YooKassaResponse = {
  id?: string;
  confirmation?: { confirmation_url?: string };
};

const apiUrl = 'https://api.yookassa.ru/v3/payments';

export class YooKassaConfigurationError extends Error {}
export class YooKassaRequestError extends Error {}

function getConfig(): YooKassaConfig {
  const shopId = process.env.YOO_KASSA_SHOP_ID;
  const secretKey = process.env.YOO_KASSA_SECRET_KEY;

  if (!shopId || !secretKey) {
    throw new YooKassaConfigurationError('ЮKassa ещё не настроена.');
  }

  return { shopId, secretKey };
}

export async function createYooKassaPayment({ amountKopecks, description, returnUrl }: PaymentInput) {
  if (!Number.isSafeInteger(amountKopecks) || amountKopecks < 1) {
    throw new YooKassaConfigurationError('Для оплаты нужна корректная цена.');
  }

  const { shopId, secretKey } = getConfig();
  const credentials = Buffer.from(`${shopId}:${secretKey}`).toString('base64');
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
      'Idempotence-Key': crypto.randomUUID(),
    },
    body: JSON.stringify({
      amount: { value: (amountKopecks / 100).toFixed(2), currency: 'RUB' },
      confirmation: { type: 'redirect', return_url: returnUrl },
      capture: true,
      description,
      metadata: { collection: '001', brand: 'LWS Aura' },
    }),
    cache: 'no-store',
  });

  let payment: YooKassaResponse | null = null;
  try {
    payment = await response.json() as YooKassaResponse;
  } catch {
    // The user should not receive an upstream response body that might contain internals.
  }

  const confirmationUrl = payment?.confirmation?.confirmation_url;
  if (!response.ok || !payment?.id || !confirmationUrl) {
    throw new YooKassaRequestError('Не удалось создать платёж. Попробуйте ещё раз позднее.');
  }

  return { id: payment.id, confirmationUrl };
}
