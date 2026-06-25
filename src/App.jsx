import React, { useState } from 'react';

import Sidebar from './components/Sidebar';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import TransactionPage from './pages/TransactionPage';
import PaymentPage from './pages/PaymentPage';
import ReceiptPage from './pages/ReceiptPage';
import HistoryPage from './pages/HistoryPage';
import DetailsPage from './pages/DetailsPage';

const INITIAL_PRODUCTS = [
  { id: 'SKU-1029', name: 'AlphaTech Pro Wireless Earbuds', price: 2499, stock: 145 },
  { id: 'SKU-8832', name: 'ErgoGrip Mechanical Keyboard', price: 4199, stock: 84 },
  { id: 'SKU-3321', name: 'Legacy USB 2.0 Hub (4-port)', price: 599, stock: 12 },
  { id: 'SKU-4110', name: 'Lumina 4K Monitor (27-inch)', price: 18500, stock: 32 },
  { id: 'SKU-1190', name: 'Wired Earphones (Basic)', price: 299, stock: 8 },
  { id: 'SKU-9021', name: 'TitanX Gaming Mouse', price: 1499, stock: 65 },
];

export default function App() {
  // Start on Login page
  const [currentPage, setCurrentPage] = useState('login');

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const [transactions, setTransactions] = useState([
    {
      receiptNo: 'REC-2026-001',
      date: '2026-06-13',
      time: '08:45',
      items: [
        {
          id: 'SKU-1029',
          name: 'AlphaTech Pro Wireless Earbuds',
          price: 2499,
          qty: 1,
        },
      ],
      total: 2499,
      paid: 3000,
      change: 501,
      paymentMethod: 'Cash',
      cashier: 'Alex Diaz',
    },
  ]);

  // Login Page
  if (currentPage === 'login') {
    return (
      <LoginPage
        setCurrentPage={setCurrentPage}
      />
    );
  }

  // Register Page
  if (currentPage === 'register') {
    return (
      <RegisterPage
        setCurrentPage={setCurrentPage}
      />
    );
  }

  return (
    <div className="flex h-screen bg-background text-slate-800 overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="flex-1 overflow-y-auto p-8 bg-background">

        {currentPage === 'transaction' && (
          <TransactionPage
            products={products}
            cart={cart}
            setCart={setCart}
            setCurrentPage={setCurrentPage}
            onProceedToPayment={() => setCurrentPage('payment')}
          />
        )}

        {currentPage === 'payment' && (
          <PaymentPage
            cart={cart}
            setCart={setCart}
            products={products}
            setProducts={setProducts}
            transactions={transactions}
            setTransactions={setTransactions}
            setCurrentReceipt={setCurrentReceipt}
            onSuccess={() => setCurrentPage('receipt')}
            onCancel={() => setCurrentPage('transaction')}
          />
        )}

        {currentPage === 'receipt' && (
          <ReceiptPage
            receipt={currentReceipt}
            onNewTransaction={() => {
              setCart([]);
              setCurrentReceipt(null);
              setCurrentPage('transaction');
            }}
          />
        )}

        {currentPage === 'history' && (
          <HistoryPage
            transactions={transactions}
            onViewDetails={(id) => {
              setSelectedTransactionId(id);
              setCurrentPage('details');
            }}
          />
        )}

        {currentPage === 'details' && (
          <DetailsPage
            transaction={transactions.find(
              (t) => t.receiptNo === selectedTransactionId
            )}
            onBack={() => setCurrentPage('history')}
          />
        )}

      </main>
    </div>
  );
}