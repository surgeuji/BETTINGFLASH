import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import AdminDashboard from './pages/Dashboard';
import AdminUsers from './pages/Users';
import AdminWallets from './pages/Wallets';
import AdminDeposits from './pages/Deposits';
import AdminWithdrawals from './pages/Withdrawals';
import AdminBets from './pages/Bets';
import AdminCasino from './pages/Casino';
import AdminVirtual from './pages/Virtual';
import AdminPromo from './pages/Promo';
import AdminLogs from './pages/Logs';
import AdminLogin from './pages/Login';

function App() {
  return (
    <Router>
      <AdminProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/wallets" element={<AdminWallets />} />
          <Route path="/admin/deposits" element={<AdminDeposits />} />
          <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />
          <Route path="/admin/bets" element={<AdminBets />} />
          <Route path="/admin/casino" element={<AdminCasino />} />
          <Route path="/admin/virtual" element={<AdminVirtual />} />
          <Route path="/admin/promo" element={<AdminPromo />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={5000} />
      </AdminProvider>
    </Router>
  );
}

export default App;
