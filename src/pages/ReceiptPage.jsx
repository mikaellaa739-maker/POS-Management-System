import { CheckCircle, Printer, Download, RefreshCw } from 'lucide-react';

export default function ReceiptPage({ receipt, onNewTransaction }) {
  if (!receipt) return null;

  return (
    <div className="max-w-md mx-auto space-y-6 mt-4">
      <div className="text-center space-y-2">
        <CheckCircle className="mx-auto text-emerald-400" size={48} />
        <h2 className="text-2xl font-bold text-slate-900">Payment Successful</h2>
        <p className="text-sm text-slate-500">Transaction processed successfully</p>
      </div>

      <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl font-mono text-sm space-y-4 border-t-8 border-navy-600">
        <div className="text-center border-b border-dashed border-slate-300 pb-4">
          <h3 className="font-bold text-lg tracking-wider">VENDTRACK</h3>
          <p className="text-xs text-slate-500">Brgy. Bubukal, Sta. Cruz, Laguna, Philippines</p>
        </div>

        <div className="space-y-1 text-xs text-slate-600">
          <div className="flex justify-between"><span>Receipt No:</span><span className="font-bold">{receipt.receiptNo}</span></div>
          <div className="flex justify-between"><span>Date / Time:</span><span>{receipt.date} {receipt.time}</span></div>
          <div className="flex justify-between"><span>Cashier:</span><span>{receipt.cashier}</span></div>
        </div>

        <div className="border-b border-dashed border-slate-300 py-2">
          {receipt.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs my-2">
              <div>
                <div>{item.name}</div>
                <div className="text-slate-500">{item.qty} x ₱{item.price.toLocaleString()}</div>
              </div>
              <span className="font-medium">₱{(item.qty * item.price).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1.5 pt-2 text-xs">
          <div className="flex justify-between text-sm font-bold"><span>Total Amount</span><span>₱{receipt.total.toLocaleString()}</span></div>
          <div className="flex justify-between text-slate-600"><span>Payment ({receipt.paymentMethod})</span><span>₱{receipt.paid.toLocaleString()}</span></div>
          <div className="flex justify-between font-medium"><span>Change</span><span>₱{receipt.change.toLocaleString()}</span></div>
        </div>

        <div className="text-center pt-6 text-[10px] text-slate-400 border-t border-dashed border-slate-200">
          Thank you for shopping with us!
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => window.print()} className="bg-white hover:bg-slate-50 text-slate-900 p-3 rounded-xl flex items-center justify-center gap-2 border border-slate-300 text-sm transition">
          <Printer size={16} /> Print Invoice
        </button>
        <button onClick={() => alert('Download PDF')} className="bg-white hover:bg-slate-50 text-slate-900 p-3 rounded-xl flex items-center justify-center gap-2 border border-slate-300 text-sm transition">
          <Download size={16} /> Download PDF
        </button>
        <button onClick={onNewTransaction} className="col-span-2 bg-navy-600 hover:bg-navy-600/90 text-navy-900 font-bold p-3 rounded-xl flex items-center justify-center gap-2 transition shadow-lg mt-2">
          <RefreshCw size={16} /> Start New Order
        </button>
      </div>
    </div>
  );
}
