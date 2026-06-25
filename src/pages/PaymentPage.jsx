import { useState } from 'react';
import { CreditCard, DollarSign, Wallet } from 'lucide-react';

const createNewTransaction = ({ cart, paymentAmount, method, total }) => {
  const today = new Date();
  return {
    receiptNo: `REC-${today.getTime().toString().slice(-6)}`,
    date: today.toISOString().split('T')[0],
    time: today.toTimeString().split(' ')[0].slice(0, 5),
    items: cart,
    total,
    paid: parseFloat(paymentAmount),
    change: parseFloat(paymentAmount) - total,
    paymentMethod: method,
    cashier: 'Alex Diaz'
  };
};

export default function PaymentPage({ cart, setCart, products, setProducts, transactions, setTransactions, setCurrentReceipt, onSuccess, onCancel }) {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [method, setMethod] = useState('Cash');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const change = paymentAmount ? parseFloat(paymentAmount) - total : 0;

  const handleConfirm = (e) => {
    e.preventDefault();
    if (parseFloat(paymentAmount) < total || !paymentAmount) {
      alert("Insufficient payment amount!");
      return;
    }

    const newTransaction = createNewTransaction({ cart, paymentAmount, method, total });

    const updatedProducts = products.map(p => {
      const cartItem = cart.find(item => item.id === p.id);
      return cartItem ? { ...p, stock: p.stock - cartItem.qty } : p;
    });

    setProducts(updatedProducts);
    setTransactions([newTransaction, ...transactions]);
    setCurrentReceipt(newTransaction);
    onSuccess();
  };

  const confirmCancel = () => {
    setCart([]);
    setShowCancelConfirm(false);
    onCancel();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-slate-50">
      <div className="w-full max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-white">
          <h2 className="text-xl font-bold text-slate-900">Process Checkout Payment</h2>
        </div>

      <form onSubmit={handleConfirm} className="p-6 space-y-6">
        <div className="bg-slate-100 p-5 rounded-xl border border-slate-200 text-center">
          <span className="text-xs tracking-wider font-semibold text-slate-600 block uppercase mb-1">Total Due</span>
          <span className="text-4xl font-extrabold text-slate-900">₱{total.toLocaleString()}</span>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Payment Method</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'Cash', icon: Wallet },
              { name: 'GCash', icon: DollarSign },
              { name: 'Card', icon: CreditCard }
            ].map(m => {
              const Icon = m.icon;
              return (
                <button
                  type="button" key={m.name} onClick={() => setMethod(m.name)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border font-medium transition ${
                    method === m.name
                      ? 'border-[#5e35b1] bg-[#5e35b1]/15 text-[#5e35b1] shadow-sm'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <Icon size={20} className={method === m.name ? 'text-[#5e35b1]' : 'text-slate-500'} />
                  <span className="text-sm">{m.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Amount Tendered (₱)</label>
          <input
            type="number" required min={total} placeholder="0.00"
            className="w-full bg-white border border-slate-300 rounded-xl p-3 text-lg font-bold text-slate-900 focus:outline-none focus:border-[#5e35b1]"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center px-4 py-3 bg-navy-900/60 rounded-xl border border-navy-700/50">
          <span className="text-sm text-slate-400">Change Due:</span>
          <span className={`text-xl font-bold ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ₱{change >= 0 ? change.toLocaleString() : '0'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <button
            type="button" onClick={() => setShowCancelConfirm(true)}
            className="border border-navy-700 hover:bg-navy-700 text-slate-900 font-semibold py-3 rounded-xl transition"
          >
            Cancel Transaction
          </button>
          <button
            type="submit"
            className="bg-navy-600 hover:bg-navy-600/90 text-navy-900 font-bold py-3 rounded-xl shadow-lg transition"
          >
            Confirm Payment
          </button>
        </div>
      </form>
    </div>

    {showCancelConfirm && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6">
        <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 shadow-2xl">
          <h3 className="text-lg font-bold text-slate-900">Cancel Transaction</h3>
          <p className="mt-3 text-sm text-slate-600">Are you sure you want to cancel this transaction?</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => setShowCancelConfirm(false)}
              className="w-full rounded-xl bg-[#5e35b1] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4a148c] sm:w-auto"
            >
              No
            </button>
            <button
              type="button"
              onClick={confirmCancel}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}