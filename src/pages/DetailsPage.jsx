import { ArrowLeft, User, Calendar, CreditCard } from 'lucide-react';

export default function DetailsPage({ transaction, onBack }) {
  if (!transaction) return <div className="text-white">Transaction data missing.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-slate-50">
      <div className="space-y-6 max-w-3xl w-full">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-900 hover:text-[#5e35b1] transition">
          <ArrowLeft size={16} /> Back to Transaction Ledger Logs
        </button>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-start border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-semibold text-slate-900 uppercase tracking-widest">Audit View</span>
            <h2 className="text-xl font-bold text-[#5e35b1] font-mono">{transaction.receiptNo}</h2>
          </div>
          <div className="text-right text-sm text-slate-900">
            <div className="flex items-center gap-1.5"><Calendar size={14} className="text-slate-900"/> {transaction.date} {transaction.time}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
          <div className="flex items-center gap-3 text-slate-900">
            <User size={18} className="text-slate-900" />
            <div><span className="text-xs text-slate-900 block">Processing Cashier</span><strong className="text-[#5e35b1]">{transaction.cashier}</strong></div>
          </div>
          <div className="flex items-center gap-3 text-slate-900">
            <CreditCard size={18} className="text-slate-900" />
            <div><span className="text-xs text-slate-900 block">Payment Method Channel</span><strong className="text-[#5e35b1]">{transaction.paymentMethod}</strong></div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Purchased Items Summary</h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            {transaction.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-white border-b border-slate-200 last:border-b-0 text-sm">
                <div>
                  <h4 className="font-medium text-[#5e35b1]">{item.name}</h4>
                  <span className="text-xs text-slate-900">{item.id} • ₱{item.price.toLocaleString()} each</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-[#5e35b1]">₱{(item.qty * item.price).toLocaleString()}</div>
                  <span className="text-xs text-slate-900">Qty: {item.qty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col items-end space-y-2 text-sm">
          <div className="w-64 flex justify-between text-slate-900"><span>Gross Total:</span><span className="text-[#5e35b1]">₱{transaction.total.toLocaleString()}</span></div>
          <div className="w-64 flex justify-between text-slate-900"><span>Amount Tendered:</span><span className="text-[#5e35b1]">₱{transaction.paid.toLocaleString()}</span></div>
          <div className="w-64 flex justify-between text-lg font-bold border-t border-slate-200 pt-2 text-[#5e35b1]">
            <span>Change Returned:</span>
            <span>₱{transaction.change.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}