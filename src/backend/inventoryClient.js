// ════════════════════════════════════════════════════════════════
//  SETUP (GAWIN TO BAGO PRESENTATION):
//  Palitan ang INVENTORY_API sa ibaba ng ngrok URL ni Jane (M1)
//  Example: const INVENTORY_API = 'https://abc123.ngrok-free.dev/api';
// ════════════════════════════════════════════════════════════════

const INVENTORY_API = 'https://tamper-polio-speller.ngrok-free.dev/api';

const NGROK_HEADER = { 'ngrok-skip-browser-warning': 'true' };

export async function checkProductStock(productId, qty) {
  const res = await fetch(`${INVENTORY_API}/products/${productId}/`, { headers: NGROK_HEADER });
  if (!res.ok) {
    throw new Error(`Product ${productId} not found in Inventory`);
  }
  const product = await res.json();
  return product.stock_quantity >= qty;
}

export async function deductProductStock(productId, qty) {
  const res = await fetch(`${INVENTORY_API}/products/deduct-stock/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...NGROK_HEADER },
    body: JSON.stringify({ product_id: productId, quantity: qty }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to deduct stock');
  }
  return res.json();
}

export async function getProductsFromInventory() {
  const res = await fetch(`${INVENTORY_API}/products/dropdown/`, { headers: NGROK_HEADER });
  if (!res.ok) throw new Error('Failed to fetch products from Inventory');
  return res.json();
}
