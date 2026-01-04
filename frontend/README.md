# Betting Flash Frontend

User-facing betting and casino application.

## Setup

```bash
npm install
npm start
```

## Environment Variables

Create `.env`:
```
REACT_APP_API_URL=http://localhost:5000
```

## Pages

- **Register** - User registration (9 fields, optional promo code)
- **Login** - Email/password login
- **Home** - Main dashboard
- **Casino** - Casino games (Spin, Crash, Dice, Slots)
- **Virtual** - Virtual match betting
- **Open Bets** - Running bets
- **Bet History** - Settled bets
- **Deposit** - Deposit funds
- **Withdraw** - Withdraw funds (requires settled bets)
- **Account** - Profile management

## Color System

- Background: #0B0F14
- Card: #151A21
- Neon Green (Primary): #00FF7F
- Gold (Highlight): #FFD700
- Win Green: #1AFF00
- Loss Red: #FF3B3B
- Pending Blue: #1E90FF

## Features

- ✅ Sports betting with real/virtual matches
- ✅ Casino games (admin-controlled outcomes)
- ✅ Virtual games (admin-controlled timelines)
- ✅ Manual deposits & withdrawals
- ✅ Bet management (view, cancel)
- ✅ Wallet (view only, admin updates)
- ✅ Promo code support
