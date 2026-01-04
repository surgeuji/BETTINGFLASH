# BETTING FLASH - Complete File Structure & Paths

## PROJECT OVERVIEW

**Betting Flash** is a production-grade, admin-controlled betting and casino web application with **NO DATABASE**. All data is stored in-memory, making it database-agnostic and ready for future database integration.

**Architecture:**
- **Backend:** Node.js/Express API (Render)
- **Frontend:** React User App (Vercel)
- **Admin Dashboard:** React Admin Panel (Vercel)
- **Deployment:** Free tier (Vercel + Render)
- **Admin Contact:** bettingflash62@gmail.com

---

## BACKEND FILE STRUCTURE

### Root Configuration

| File | Path | Purpose |
|------|------|---------|
| package.json | `backend/package.json` | Dependencies: express, dotenv, jwt, bcryptjs, axios, nodemailer, cors, helmet |
| .env.example | `backend/.env.example` | Environment template with all credentials |
| .gitignore | `backend/.gitignore` | Exclude node_modules, .env |

### Entry Points

| File | Path | Purpose |
|------|------|---------|
| app.js | `backend/src/app.js` | Express app configuration, middleware setup, routes mounting |
| server.js | `backend/src/server.js` | Server bootstrap, port 5000, startup banner |

### Configuration Files

| File | Path | Purpose |
|------|------|---------|
| env.js | `backend/src/config/env.js` | Load environment variables, export config object |
| jwt.js | `backend/src/config/jwt.js` | JWT generation, verification, decoding |
| db.js | `backend/src/config/db.js` | Placeholder DB connection (in-memory mode active) |

### Models (Data Structures - No Database)

| File | Path | Purpose |
|------|------|---------|
| User.model.js | `backend/src/models/User.model.js` | User class: id, email, phone, password (hashed), country, bank details, status, role |
| Wallet.model.js | `backend/src/models/Wallet.model.js` | Wallet: mainBalance, bonusBalance, totalBalance, currency |
| Bet.model.js | `backend/src/models/Bet.model.js` | Bet: selections, odds, stake, status (RUNNING/WON/LOST/VOID), result |
| Deposit.model.js | `backend/src/models/Deposit.model.js` | Deposit: amount, status (PENDING/APPROVED/REJECTED), admin approval |
| Withdrawal.model.js | `backend/src/models/Withdrawal.model.js` | Withdrawal: amount, status, settled bet requirements |
| CasinoGame.model.js | `backend/src/models/CasinoGame.model.js` | Casino: gameType, stake, odds (1-15), admin-controlled outcome |
| VirtualGame.model.js | `backend/src/models/VirtualGame.model.js` | Virtual: teams, odds, admin-set goals, time-based results |
| PromoCode.model.js | `backend/src/models/PromoCode.model.js` | Promo: code (XXX-NNN), bonus %, usage limit, expiry |
| AdminLog.model.js | `backend/src/models/AdminLog.model.js` | Audit trail: admin action, target, timestamp, result |

### Services (In-Memory Data & Business Logic)

| File | Path | Purpose |
|------|------|---------|
| user.service.js | `backend/src/services/user.service.js` | UserService: register, login, profile, freeze/unfreeze users |
| wallet.service.js | `backend/src/services/wallet.service.js` | WalletService: create, credit/debit, bonus management (admin-only) |
| odds.service.js | `backend/src/services/odds.service.js` | Calculate combined odds, potentials wins, apply 3% bonus, 200M cap, validate selections (max 60) |
| bonus.service.js | `backend/src/services/bonus.service.js` | BonusService: create promo codes, validate, apply bonuses, track usage |
| bet.service.js | `backend/src/services/bet.service.js` | BetService: create bets, settle (won/lost/void/postpone), track running/settled |
| deposit.service.js | `backend/src/services/deposit.service.js` | DepositService: create requests, admin approve/reject, track pending |
| withdrawal.service.js | `backend/src/services/withdrawal.service.js` | WithdrawalService: create requests, admin approve/complete/reject |
| casino.service.js | `backend/src/services/casino.service.js` | CasinoService: create games, admin set outcomes (WIN/LOSS) |
| virtual.service.js | `backend/src/services/virtual.service.js` | VirtualService: upload games, user bets, admin set results, auto-settle users |
| admin.log.service.js | `backend/src/services/admin.log.service.js` | AdminLogService: log all admin actions, query by admin/action/date |
| notification.service.js | `backend/src/services/notification.service.js` | Send emails (registration, deposit approval, withdrawal approval), SMS placeholders |

### Controllers (Request Handlers)

| File | Path | Purpose |
|------|------|---------|
| auth.controller.js | `backend/src/controllers/auth.controller.js` | POST /auth/register, /auth/login |
| user.controller.js | `backend/src/controllers/user.controller.js` | GET /user/profile, PUT /user/profile, GET /user/status |
| wallet.controller.js | `backend/src/controllers/wallet.controller.js` | GET /wallet (user view only) |
| deposit.controller.js | `backend/src/controllers/deposit.controller.js` | POST /deposit, GET /deposit, GET /deposit/:id |
| withdrawal.controller.js | `backend/src/controllers/withdrawal.controller.js` | POST /withdrawal, GET /withdrawal, GET /withdrawal/:id |
| bet.controller.js | `backend/src/controllers/bet.controller.js` | POST /bet, GET /bet, GET /bet/running, GET /bet/settled, POST /bet/:id/cancel |
| casino.controller.js | `backend/src/controllers/casino.controller.js` | POST /casino, GET /casino, GET /casino/:id |
| virtual.controller.js | `backend/src/controllers/virtual.controller.js` | GET /virtual, POST /virtual/:gameId/bet, GET /virtual/:id |
| admin.controller.js | `backend/src/controllers/admin.controller.js` | ALL admin operations: users, wallets, deposits, withdrawals, bets, casino, virtual, promo, logs |

### Routes (URL Mapping)

| File | Path | Purpose |
|------|------|---------|
| auth.routes.js | `backend/src/routes/auth.routes.js` | /auth/* (register, login) |
| user.routes.js | `backend/src/routes/user.routes.js` | /user/* (profile, status) |
| wallet.routes.js | `backend/src/routes/wallet.routes.js` | /wallet/* (view balance only) |
| deposit.routes.js | `backend/src/routes/deposit.routes.js` | /deposit/* (CRUD) |
| withdrawal.routes.js | `backend/src/routes/withdrawal.routes.js` | /withdrawal/* (CRUD) |
| bet.routes.js | `backend/src/routes/bet.routes.js` | /bet/* (place, view, cancel) |
| casino.routes.js | `backend/src/routes/casino.routes.js` | /casino/* (games) |
| virtual.routes.js | `backend/src/routes/virtual.routes.js` | /virtual/* (games, bets) |
| admin.routes.js | `backend/src/routes/admin.routes.js` | /admin/* (all admin operations with role-based access) |

### Middleware

| File | Path | Purpose |
|------|------|---------|
| auth.middleware.js | `backend/src/middlewares/auth.middleware.js` | JWT validation, admin-only, role-based access control (RBAC) |
| admin.middleware.js | `backend/src/middlewares/admin.middleware.js` | Admin action logging, audit trail capture |
| error.middleware.js | `backend/src/middlewares/error.middleware.js` | Centralized error handling, 404 handler |

### Utilities

| File | Path | Purpose |
|------|------|---------|
| generateCode.js | `backend/src/utils/generateCode.js` | Generate promo codes (XXX-NNN format), validate format |
| validators.js | `backend/src/utils/validators.js` | Email, phone, password, amount, country validation |
| currency.js | `backend/src/utils/currency.js` | Format currency, apply bonus (3%), apply tax, conversion placeholders |

---

## FRONTEND FILE STRUCTURE

### Root Configuration

| File | Path | Purpose |
|------|------|---------|
| package.json | `frontend/package.json` | Dependencies: react, react-router-dom, axios, react-icons, react-toastify |
| .env.example | `frontend/.env.example` | REACT_APP_API_URL=http://localhost:5000 |

### Entry Points

| File | Path | Purpose |
|------|------|---------|
| index.js | `frontend/src/index.js` | React DOM render |
| index.css | `frontend/src/index.css` | Global styles, dark theme, input/button styling |
| App.js | `frontend/src/App.js` | Main router, context providers, layout |
| public/index.html | `frontend/public/index.html` | HTML template, root div, metadata |

### Assets

| File | Path | Purpose |
|------|------|---------|
| colors.js | `frontend/src/assets/colors.js` | Single source of truth: #0B0F14 bg, #00FF7F neon, #FFD700 gold, etc. |

### Context (State Management)

| File | Path | Purpose |
|------|------|---------|
| AuthContext.js | `frontend/src/context/AuthContext.js` | User login, logout, restore session |
| WalletContext.js | `frontend/src/context/WalletContext.js` | Wallet balance, deposits, withdrawals |
| BetContext.js | `frontend/src/context/BetContext.js` | Bet slip management, odds calculations |

### Services (API Calls)

| File | Path | Purpose |
|------|------|---------|
| api.js | `frontend/src/services/api.js` | Axios base config, JWT interceptor, 401 redirect |
| auth.service.js | `frontend/src/services/auth.service.js` | Login, register, localStorage tokens |
| wallet.service.js | `frontend/src/services/wallet.service.js` | Fetch wallet, deposits, withdrawals |
| bet.service.js | `frontend/src/services/bet.service.js` | Place bets, fetch running/settled |
| casino.service.js | `frontend/src/services/casino.service.js` | Create games, fetch user games |

### Pages (9 Mandatory Pages)

| File | Path | Purpose |
|------|------|---------|
| Register.js | `frontend/src/pages/Register.js` | **FIRST SCREEN** - Register form (9 fields + optional promo) |
| Login.js | `frontend/src/pages/Login.js` | Email/password login |
| Home.js | `frontend/src/pages/Home.js` | Main dashboard, featured bets |
| Casino.js | `frontend/src/pages/Casino.js` | Spin Wheel, Crash, Dice, Slots |
| Virtual.js | `frontend/src/pages/Virtual.js` | Virtual match betting |
| OpenBets.js | `frontend/src/pages/OpenBets.js` | Running bets display |
| BetHistory.js | `frontend/src/pages/BetHistory.js` | Settled bets, stats |
| Deposit.js | `frontend/src/pages/Deposit.js` | Submit deposit, show bank details, mark pending |
| Withdraw.js | `frontend/src/pages/Withdraw.js` | Withdrawal form, settled bet count check |
| Account.js | `frontend/src/pages/Account.js` | Profile edit, account settings |

### Components (To Be Implemented)

| File | Path | Purpose |
|------|------|---------|
| Header.js | `frontend/src/components/Header.js` | Navigation bar, user menu |
| Footer.js | `frontend/src/components/Footer.js` | Footer with links |
| BetSlip.js | `frontend/src/components/BetSlip.js` | Bet slip panel, stake input, place bet |
| OddsCard.js | `frontend/src/components/OddsCard.js` | Single odd display with add to slip |
| Modal.js | `frontend/src/components/Modal.js` | Reusable modal component |

---

## ADMIN DASHBOARD FILE STRUCTURE

### Root Configuration

| File | Path | Purpose |
|------|------|---------|
| package.json | `admin-dashboard/package.json` | Same as frontend: react, react-router-dom, axios |
| .env.example | `admin-dashboard/.env.example` | REACT_APP_API_URL=http://localhost:5000 |

### Entry Points

| File | Path | Purpose |
|------|------|---------|
| index.js | `admin-dashboard/src/index.js` | React DOM render |
| index.css | `admin-dashboard/src/index.css` | Admin styling |
| App.js | `admin-dashboard/src/App.js` | Router, context, admin layout |
| public/index.html | `admin-dashboard/public/index.html` | HTML template |

### Assets

| File | Path | Purpose |
|------|------|---------|
| colors.js | `admin-dashboard/src/assets/colors.js` | Same color system as frontend |

### Context

| File | Path | Purpose |
|------|------|---------|
| AdminContext.js | `admin-dashboard/src/context/AdminContext.js` | Admin role, permissions, RBAC visibility |

### Services

| File | Path | Purpose |
|------|------|---------|
| admin.auth.service.js | `admin-dashboard/src/services/admin.auth.service.js` | Admin login, token management |
| admin.service.js | `admin-dashboard/src/services/admin.service.js` | All admin API calls with role filters |

### Pages (Role-Based Visibility)

| Page | Path | SUPER_ADMIN | FINANCE_ADMIN | OPS_ADMIN | SUPPORT_ADMIN |
|------|------|------------|--------------|----------|--------------|
| Dashboard | `admin-dashboard/src/pages/Dashboard.js` | ✅ | ✅ | ✅ | ✅ |
| Users | `admin-dashboard/src/pages/Users.js` | ✅ | ❌ | ❌ | ✅ (view only) |
| Wallets | `admin-dashboard/src/pages/Wallets.js` | ✅ | ✅ | ❌ | ❌ |
| Deposits | `admin-dashboard/src/pages/Deposits.js` | ✅ | ✅ | ❌ | ✅ (view only) |
| Withdrawals | `admin-dashboard/src/pages/Withdrawals.js` | ✅ | ✅ | ❌ | ✅ (view only) |
| Bets | `admin-dashboard/src/pages/Bets.js` | ✅ | ❌ | ✅ | ✅ (view only) |
| Casino | `admin-dashboard/src/pages/Casino.js` | ✅ | ❌ | ✅ | ❌ |
| Virtual | `admin-dashboard/src/pages/Virtual.js` | ✅ | ❌ | ✅ | ❌ |
| Promo | `admin-dashboard/src/pages/Promo.js` | ✅ | ❌ | ❌ | ❌ |
| Logs | `admin-dashboard/src/pages/Logs.js` | ✅ | ❌ | ❌ | ❌ |
| Login | `admin-dashboard/src/pages/Login.js` | Public | Public | Public | Public |

### Components (To Be Implemented)

| File | Path | Purpose |
|------|------|---------|
| Sidebar.js | `admin-dashboard/src/components/Sidebar.js` | Role-based navigation menu (items hidden based on role) |
| UserTable.js | `admin-dashboard/src/components/UserTable.js` | User list with freeze/unfreeze buttons |
| DepositApprovalModal.js | `admin-dashboard/src/components/DepositApprovalModal.js` | Approve with optional bonus |
| BetSettlementPanel.js | `admin-dashboard/src/components/BetSettlementPanel.js` | Won/Lost/Void/Postpone controls |

---

## ENVIRONMENT VARIABLES (.env)

### Backend (.env)

```
PORT=5000
NODE_ENV=production
JWT_SECRET=your_secret_key_change_in_production

SPORTS_API_URL=https://www.api-football.com
SPORTS_API_KEY=46c62fd8011b06c3f262ef46528d7ac9

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=bettingflash62@gmail.com
SMTP_PASS=xqpb jelh jytw mtbl
SMTP_FROM=bettingflash62@gmail.com

ADMIN_EMAIL=bettingflash62@gmail.com
ADMIN_PHONE=07071198393

NIGERIAN_BANK_NAME=opay
NIGERIAN_ACCOUNT_NUMBER=9133758994
NIGERIAN_ACCOUNT_HOLDER=CHAKIDA ADAMU JOSEPH

FOREIGN_BANK_NAME=palmpay
FOREIGN_ACCOUNT_NUMBER=7071198393
FOREIGN_ACCOUNT_HOLDER=Hope Adamchin

FRONTEND_URL=http://localhost:3000
ADMIN_DASHBOARD_URL=http://localhost:3001
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000
```

### Admin Dashboard (.env)

```
REACT_APP_API_URL=http://localhost:5000
```

---

## ADMIN ROLES & PERMISSIONS

### Admin Roles

1. **SUPER_ADMIN** - Full system control
2. **FINANCE_ADMIN** - Money management only
3. **OPERATIONS_ADMIN** - Games control only
4. **SUPPORT_ADMIN** - Read-only support

### Permission Matrix

See "BETTING FLASH — ADMIN UI VISIBILITY MAP" document for complete visibility rules.

---

## DEPLOYMENT TARGETS

| Service | Platform | URL Pattern | Free Tier |
|---------|----------|------------|-----------|
| Backend | Render | api.bettingflash.com | ✅ (5 free apps) |
| Frontend | Vercel | app.bettingflash.com | ✅ |
| Admin | Vercel | admin.bettingflash.com | ✅ |

---

## RUNNING LOCALLY

### Backend
```bash
cd backend
npm install
npm run dev  # Uses nodemon
# Starts on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm start
# Starts on http://localhost:3000
```

### Admin Dashboard
```bash
cd admin-dashboard
npm install
npm start
# Starts on http://localhost:3001
```

---

## KEY FEATURES

### Manual Settlement Only
- ✅ No automatic balance updates
- ✅ All money movement requires admin approval
- ✅ Deposits: PENDING → Admin Approves → COMPLETED
- ✅ Withdrawals: PENDING → Admin Approves → COMPLETED
- ✅ Bets: RUNNING → Admin Settles (WON/LOST/VOID)

### In-Memory Storage (No Database)
- ✅ Ready for DB integration (all models defined)
- ✅ Services manage data lifecycle
- ✅ Production-grade architecture

### Role-Based Admin Control
- ✅ SUPER_ADMIN: Everything
- ✅ FINANCE_ADMIN: Only deposits/withdrawals/balances
- ✅ OPERATIONS_ADMIN: Only games/bets
- ✅ SUPPORT_ADMIN: Read-only

### Audit Trail
- ✅ Every admin action logged
- ✅ Timestamp, admin ID, action type, target, result

---

## NOTES

- **No hardcoded secrets** - All credentials in .env
- **Mobile-first responsive** - Dark mode default
- **Casino-style UI** - Neon glows, gradients, rounded corners
- **Production-ready** - Error handling, validation, security middleware
- **Database-agnostic** - Switch to MongoDB/PostgreSQL later without changing business logic
- **Email/SMS ready** - Notifications configured, SMS integration placeholder
- **Free deployment** - Both Vercel & Render free tiers supported
