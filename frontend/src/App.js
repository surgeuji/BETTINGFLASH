import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { BetProvider } from './context/BetContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Casino from './pages/Casino';
import Virtual from './pages/Virtual';
import OpenBets from './pages/OpenBets';
import BetHistory from './pages/BetHistory';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Account from './pages/Account';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WalletProvider>
          <BetProvider>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/casino" element={<Casino />} />
              <Route path="/virtual" element={<Virtual />} />
              <Route path="/open-bets" element={<OpenBets />} />
              <Route path="/bet-history" element={<BetHistory />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/account" element={<Account />} />
            </Routes>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </BetProvider>
        </WalletProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
