import React, { useState } from 'react';
import { Eye, Search, Calendar } from 'lucide-react';

export default function HistoryPage({ transactions, onViewDetails }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const filteredHistory = transactions.filter(t => 
    (t.receiptNo.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (searchDate === '' || t.date === searchDate)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Transaction Ledger History</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={16} />
            <input 
              type="text" placeholder="Search Receipt ID..."
              className="bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#5e35b1] text-slate-900 w-56"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-slate-400" size={16} />
            <input 
              type="date" 
              className="bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#5e35b1] text-slate-900"
              value={searchDate} onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
              <th className="p-4">Receipt Number</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Items Count</th>
              <th className="p-4">Total Charge</th>
              <th className="p-4">Method</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-900">
            {filteredHistory.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-500">No matched transaction logs available.</td>
              </tr>
            ) : (
              filteredHistory.map((tx) => (
                <tr key={tx.receiptNo} className="hover:bg-slate-100 transition">
                  <td className="p-4 font-mono text-[#5e35b1] font-medium">{tx.receiptNo}</td>
                  <td className="p-4 text-slate-900">{tx.date} at {tx.time}</td>
                  <td className="p-4 text-slate-900">{tx.items.reduce((acc, curr) => acc + curr.qty, 0)} items</td>
                  <td className="p-4 text-slate-900 font-semibold">₱{tx.total.toLocaleString()}</td>
                  <td className="p-4"><span className="px-2 py-1 text-xs bg-slate-100 border border-slate-200 rounded-md text-slate-900">{tx.paymentMethod}</span></td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => onViewDetails(tx.receiptNo)}
                      className="text-slate-900 hover:text-[#5e35b1] bg-slate-100 hover:bg-[#ede7f6] p-2 rounded-lg border border-slate-200 transition"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}