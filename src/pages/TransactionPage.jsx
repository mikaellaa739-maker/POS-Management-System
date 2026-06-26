import { useState } from 'react';
import { Minus, Plus, Search } from 'lucide-react';

const emptyQuantities = (products) =>
  products.reduce((acc, product) => {
    acc[product.id] = 0;
    return acc;
  }, {});

export default function TransactionPage({ products, cart, setCart, onProceedToPayment }) {
  const [search, setSearch] = useState('');
  const [selectedQty, setSelectedQty] = useState(() =>
    products.reduce((acc, product) => {
      const cartItem = cart.find((item) => item.id === product.id);
      acc[product.id] = cartItem ? cartItem.qty : 0;
      return acc;
    }, {})
  );

  const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleQtyChange = (id, delta, stock) => {
    const currentQty = selectedQty[id] ?? 0;
    const nextQty = Math.min(Math.max(currentQty + delta, 0), stock);
    if (nextQty === currentQty) return;

    setSelectedQty({ ...selectedQty, [id]: nextQty });
  };

  const addToCart = (product) => {
    const qtyToSet = selectedQty[product.id] ?? 0;
    if (qtyToSet < 1) return;

    const existing = cart.find((item) => item.id === product.id);
    const finalQty = Math.min(qtyToSet, product.stock);

    if (existing) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, qty: finalQty } : item)));
      return;
    }

    setCart([...cart, { ...product, qty: finalQty }]);
  };

  const removeFromCart = (product) => {
    const targetQty = selectedQty[product.id] ?? 0;
    const existing = cart.find((item) => item.id === product.id);
    if (!existing) return;

    if (targetQty <= 0) {
      setCart(cart.filter((item) => item.id !== product.id));
      return;
    }

    setCart(cart.map((item) => (item.id === product.id ? { ...item, qty: targetQty } : item)));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedQty(emptyQuantities(products));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="space-y-6 p-1">
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search product or SKU..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50/80 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-[#5e35b1] focus:bg-white"
            />
          </div>

          <div className="flex justify-end">
            <div className="flex h-12 w-48 flex-col justify-center rounded-2xl border border-gray-200 bg-gray-50/80 px-4 text-center">
              <p className="text-sm font-bold leading-tight text-gray-800">{today}</p>
              <p className="mt-0.5 text-[11px] leading-tight text-gray-500">{currentTime}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-800">Product List</h2>
              <p className="text-xs text-gray-400">Browse items and add them to your cart.</p>
            </div>
            <span className="rounded-lg bg-[#ede7f6] px-3 py-1 text-xs font-semibold text-[#5e35b1]">
              {filteredProducts.length} items
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-100">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                  <th className="p-3">SKU</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-400 italic">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const selected = selectedQty[product.id] ?? 0;
                    const inCart = cart.some((item) => item.id === product.id);

                    return (
                      <tr key={product.id} className="transition hover:bg-gray-50/70">
                        <td className="p-3 font-mono text-xs text-gray-500">{product.id}</td>
                        <td className="p-3 font-semibold text-gray-800">{product.name}</td>
                        <td className="p-3">PHP {product.price.toLocaleString()}</td>
                        <td className="p-3">{product.stock}</td>
                        <td className="p-3">
                          <div className="mx-auto grid w-28 grid-cols-[2rem_1fr_2rem] items-center rounded-xl border border-gray-200 bg-white">
                            <button
                              type="button"
                              onClick={() => handleQtyChange(product.id, -1, product.stock)}
                              className="flex h-9 items-center justify-center rounded-l-xl text-gray-500 transition hover:bg-gray-50"
                              aria-label={`Decrease ${product.name} quantity`}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-center text-xs font-bold text-gray-800">{selected}</span>
                            <button
                              type="button"
                              onClick={() => handleQtyChange(product.id, 1, product.stock)}
                              className="flex h-9 items-center justify-center rounded-r-xl text-gray-500 transition hover:bg-gray-50"
                              aria-label={`Increase ${product.name} quantity`}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            {inCart && (
                              <button
                                type="button"
                                onClick={() => removeFromCart(product)}
                                className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-bold text-gray-500 transition hover:bg-gray-50"
                              >
                                Update
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => addToCart(product)}
                              disabled={selected < 1 || product.stock < 1}
                              className="rounded-xl bg-[#5e35b1] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#4527a0] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              {inCart ? 'Set Qty' : 'Add'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div>
            <div className="mb-4">
              <h2 className="text-base font-bold text-gray-800">Shopping Cart</h2>
              <p className="text-xs text-gray-400">Review cart items before payment.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left font-bold text-gray-500">
                    <th className="p-3">Product</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-600">
                  {cart.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-gray-400 italic">
                        Your cart is empty.
                      </td>
                    </tr>
                  ) : (
                    cart.map((item) => (
                      <tr key={item.id} className="transition hover:bg-gray-50/60">
                        <td className="p-3 font-medium text-gray-800">{item.name}</td>
                        <td className="p-3 font-semibold text-gray-700">{item.qty}</td>
                        <td className="p-3">PHP {item.price.toLocaleString()}</td>
                        <td className="p-3 font-semibold text-gray-900">PHP {(item.price * item.qty).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <div className="mb-4 grid gap-3 rounded-xl bg-gray-50 p-4 text-xs text-gray-600">
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Subtotal</p>
                <p className="font-semibold text-gray-800">PHP {subtotal.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Tax (12%)</p>
                <p className="font-semibold text-gray-800">PHP {tax.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200/60 pt-2">
                <p className="text-sm font-bold text-gray-700">Total Amount</p>
                <p className="text-xl font-black text-[#5e35b1]">PHP {total.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={clearCart}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs font-bold text-gray-500 transition hover:bg-gray-50"
              >
                Clear Cart
              </button>
              <button
                type="button"
                disabled={cart.length === 0}
                onClick={onProceedToPayment}
                className="flex-1 rounded-xl bg-[#5e35b1] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#4527a0] disabled:opacity-40"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
