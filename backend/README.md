# Betting Flash Backend API

Production-grade Node.js/Express backend for Betting Flash betting platform.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

See `.env.example` - includes all required credentials:
- JWT Secret
- Sports API key
- Email (SMTP)
- Bank details
- Admin contact info

## API Endpoints

### Authentication (Public)
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### User (Protected)
- `GET /user/profile` - Get profile
- `PUT /user/profile` - Update profile
- `GET /user/status` - Account status

### Wallet (Protected)
- `GET /wallet` - View wallet (admin updates balance)

### Deposits (Protected)
- `POST /deposit` - Create deposit request
- `GET /deposit` - User deposits
- `GET /deposit/:id` - Single deposit

### Withdrawals (Protected)
- `POST /withdrawal` - Create withdrawal request
- `GET /withdrawal` - User withdrawals
- `GET /withdrawal/:id` - Single withdrawal

### Sports Betting (Protected)
- `POST /bet` - Place bet (max 60 selections)
- `GET /bet` - All user bets
- `GET /bet/running` - Running bets
- `GET /bet/settled` - Settled bets
- `POST /bet/:id/cancel` - Cancel running bet

### Casino (Protected)
- `POST /casino` - Create game (odds 1-15)
- `GET /casino` - User games
- `GET /casino/:id` - Single game

### Virtual Games (Protected)
- `GET /virtual` - Available games + user bets
- `POST /virtual/:gameId/bet` - Bet on virtual game
- `GET /virtual/:id` - Single game

### Admin (Protected + Role-Based)
- `GET /admin/dashboard` - Stats
- `GET /admin/users` - All users (SUPER_ADMIN)
- `POST /admin/users/:userId/freeze` - Freeze user
- `POST /admin/users/:userId/unfreeze` - Unfreeze user
- `PUT /admin/wallet/:userId` - Edit balance (FINANCE_ADMIN)
- `POST /admin/wallet/:userId/bonus` - Add bonus
- `GET /admin/deposits` - Pending deposits
- `POST /admin/deposits/:depositId/approve` - Approve with optional bonus
- `POST /admin/deposits/:depositId/reject` - Reject deposit
- `GET /admin/withdrawals` - Pending withdrawals
- `POST /admin/withdrawals/:withdrawalId/approve` - Approve withdrawal
- `POST /admin/withdrawals/:withdrawalId/complete` - Mark as paid
- `POST /admin/withdrawals/:withdrawalId/reject` - Reject withdrawal
- `POST /admin/bets/:betId/won` - Settle as won (OPERATIONS_ADMIN)
- `POST /admin/bets/:betId/lost` - Settle as lost
- `POST /admin/bets/:betId/void` - Void bet
- `POST /admin/bets/:betId/postpone` - Postpone bet
- `GET /admin/casino` - Running casino games
- `POST /admin/casino/:gameId/outcome` - Set outcome
- `POST /admin/virtual/upload` - Upload virtual game
- `POST /admin/virtual/:gameId/outcome` - Set outcome
- `POST /admin/promo` - Create promo code (SUPER_ADMIN)
- `GET /admin/promo` - Active promo codes
- `POST /admin/promo/:codeId/deactivate` - Deactivate code
- `GET /admin/logs` - Admin logs

## In-Memory Services

### User Service
- User registration & login
- Profile management
- Account freezing
- In-memory store with email index

### Wallet Service
- Create wallets
- Credit/debit main balance
- Manage bonus balance
- In-memory store

### Bet Service
- Place bets (validate max 60 selections)
- Settle bets (won/lost/void/postpone)
- Track running/settled
- Apply 3% bonus, 200M cap

### Deposit Service
- Create requests
- Admin approve/reject
- Automatic balance credit on approval
- Optional bonus application

### Withdrawal Service
- Create requests
- Validate settled bet requirements (1 or 2 bets)
- Admin approve/complete
- Automatic balance debit on completion

### Casino Service
- Create games (1-15 odds)
- Admin set outcomes
- Automatic player balance updates

### Virtual Service
- Upload virtual games
- User betting
- Admin outcome control
- Auto-settle all users on that game

### Bonus Service
- Generate promo codes (XXX-NNN)
- Validate & apply bonuses
- Track usage

### Admin Log Service
- Log all admin actions
- Query by admin, action, date
- Audit trail

## Features

- ✅ No database (in-memory, database-ready architecture)
- ✅ Manual settlement only
- ✅ JWT authentication
- ✅ Role-based access control (4 roles)
- ✅ Email notifications
- ✅ Admin action logging
- ✅ Currency formatting & bonus calculations
- ✅ Promo code system (XXX-NNN format)
- ✅ Silent payout cap (200M)
- ✅ Input validation
- ✅ Error handling
- ✅ CORS & helmet security

## Running

```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

## Architecture

```
backend/
├── src/
│   ├── app.js              # Express setup
│   ├── server.js           # Entry point
│   ├── config/             # JWT, env, db placeholder
│   ├── models/             # Data structures (9 models)
│   ├── services/           # In-memory stores & logic (11 services)
│   ├── controllers/        # Request handlers (9 controllers)
│   ├── routes/             # URL routing (9 routes)
│   ├── middlewares/        # Auth, logging, errors
│   └── utils/              # Validators, currency, promo codes
├── package.json
├── .env.example
└── .gitignore
```

## Admin Roles

- **SUPER_ADMIN** - Full system control
- **FINANCE_ADMIN** - Deposits, withdrawals, wallets
- **OPERATIONS_ADMIN** - Bets, casino, virtual games
- **SUPPORT_ADMIN** - Read-only (not used in backend filtering, frontend only)

## Database Integration (Future)

All services are database-agnostic. To switch from in-memory to MongoDB/PostgreSQL:
1. Replace in-memory arrays in services with DB queries
2. No controller/route changes needed
3. Models already define required fields
