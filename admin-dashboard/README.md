# Betting Flash Admin Dashboard

Administrative control panel for the Betting Flash platform.

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

## Admin Roles & Permissions

### SUPER_ADMIN
- Full system access
- All pages visible
- All actions enabled

### FINANCE_ADMIN
- Wallets, Deposits, Withdrawals
- Approve/reject deposits
- Approve/complete withdrawals
- Edit user balances
- Apply bonuses

### OPERATIONS_ADMIN
- Sports Bets, Casino, Virtual Games
- Settle bets (won/lost/void)
- Set casino outcomes
- Upload virtual games
- Control virtual game outcomes

### SUPPORT_ADMIN
- Read-only access
- View users, deposits, withdrawals, bets
- No action buttons

## Pages

| Page | SUPER | FINANCE | OPS | SUPPORT |
|------|-------|---------|-----|---------|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Users | ✅ | ❌ | ❌ | ✅ (RO) |
| Wallets | ✅ | ✅ | ❌ | ❌ |
| Deposits | ✅ | ✅ | ❌ | ✅ (RO) |
| Withdrawals | ✅ | ✅ | ❌ | ✅ (RO) |
| Bets | ✅ | ❌ | ✅ | ✅ (RO) |
| Casino | ✅ | ❌ | ✅ | ❌ |
| Virtual | ✅ | ❌ | ✅ | ❌ |
| Promo Codes | ✅ | ❌ | ❌ | ❌ |
| Logs | ✅ | ❌ | ❌ | ❌ |

## Features

- ✅ Role-based access control
- ✅ Dashboard with real-time stats
- ✅ User management (freeze/unfreeze)
- ✅ Wallet management (edit balances, add bonuses)
- ✅ Deposit approval with optional bonus
- ✅ Withdrawal approval & completion
- ✅ Bet settlement (won/lost/void/postpone)
- ✅ Casino outcome control
- ✅ Virtual game upload & outcome control
- ✅ Promo code management
- ✅ Admin action logs (audit trail)

## Admin Contact

- Email: bettingflash62@gmail.com
- Phone: 07071198393

## Bank Details

**Nigeria:**
- Bank: opay
- Account: 9133758994
- Holder: CHAKIDA ADAMU JOSEPH

**International:**
- Bank: palmpay
- Account: 7071198393
- Holder: Hope Adamchin
