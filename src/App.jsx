import { useMemo, useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Sidebar from './components/Sidebar';
import TransactionPage from './pages/TransactionPage';
import PaymentPage from './pages/PaymentPage';
import ReceiptPage from './pages/ReceiptPage';
import HistoryPage from './pages/HistoryPage';
import DetailsPage from './pages/DetailsPage';

const starterProducts = [
  { id: 'SKU-001', name: 'Bottled Water', price: 20, stock: 80 },
  { id: 'SKU-002', name: 'Instant Coffee', price: 15, stock: 120 },
  { id: 'SKU-003', name: 'Chocolate Bar', price: 35, stock: 45 },
  { id: 'SKU-004', name: 'Potato Chips', price: 42, stock: 60 },
  { id: 'SKU-005', name: 'Canned Tuna', price: 58, stock: 32 },
  { id: 'SKU-006', name: 'Rice 1kg', price: 65, stock: 25 },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState('');
  const [products, setProducts] = useState(starterProducts);
  const [cart, setCart] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [selectedReceiptNo, setSelectedReceiptNo] = useState('');

  const selectedTransaction = useMemo(
    () => transactions.find((transaction) => transaction.receiptNo === selectedReceiptNo) || null,
    [selectedReceiptNo, transactions]
  );

  const goToPage = (page) => {
    if (page === 'login') {
      setCart([]);
      setCurrentReceipt(null);
      setSelectedReceiptNo('');
    }
    setCurrentPage(page);
  };

  if (currentPage === 'register') {
    return (
      <RegisterPage
        setCurrentPage={goToPage}
        setPendingVerificationEmail={setPendingVerificationEmail}
      />
    );
  }

  if (currentPage === 'verify') {
    return (
      <EmailVerificationPage
        email={pendingVerificationEmail}
        setCurrentPage={goToPage}
      />
    );
  }

  if (currentPage === 'forgot-password') {
    return <ForgotPasswordPage setCurrentPage={goToPage} />;
  }

  if (!currentUser || currentPage === 'login') {
    return (
      <LoginPage
        setCurrentPage={goToPage}
        setCurrentUser={setCurrentUser}
      />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'payment':
        return (
          <PaymentPage
            cart={cart}
            setCart={setCart}
            products={products}
            setProducts={setProducts}
            transactions={transactions}
            setTransactions={setTransactions}
            setCurrentReceipt={setCurrentReceipt}
            currentUser={currentUser}
            onSuccess={() => goToPage('receipt')}
            onCancel={() => goToPage('transaction')}
          />
        );
      case 'receipt':
        return (
          <ReceiptPage
            receipt={currentReceipt}
            onNewTransaction={() => {
              setCart([]);
              setCurrentReceipt(null);
              goToPage('transaction');
            }}
          />
        );
      case 'history':
        return (
          <HistoryPage
            transactions={transactions}
            onViewDetails={(receiptNo) => {
              setSelectedReceiptNo(receiptNo);
              goToPage('details');
            }}
          />
        );
      case 'details':
        return (
          <DetailsPage
            transaction={selectedTransaction}
            onBack={() => goToPage('history')}
          />
        );
      case 'transaction':
      default:
        return (
          <TransactionPage
            products={products}
            cart={cart}
            setCart={setCart}
            setCurrentPage={goToPage}
            onProceedToPayment={() => goToPage('payment')}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={goToPage}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <main className="min-w-0 flex-1 p-6">
        {renderPage()}
      </main>
    </div>
  );
}
