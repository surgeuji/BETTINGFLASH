# BETTING FLASH - DEPLOYMENT GUIDE

**Production deployment instructions for all three apps**

---

## 🚀 QUICK START DEPLOYMENT

### Option 1: Automated Deployment (Recommended)

#### **Backend → Render**
1. Go to [https://render.com](https://render.com)
2. Create new account
3. Click "New +" → "Web Service"
4. Connect your GitHub repo (or push manually)
5. Select `backend` directory as root
6. Render will auto-detect `render.yaml`
7. Add environment variables (see section below)
8. Deploy!

#### **Frontend → Vercel**
1. Go to [https://vercel.com](https://vercel.com)
2. Create new account
3. Click "Add New" → "Project"
4. Import GitHub repo
5. Select `frontend` directory as root
6. Add `REACT_APP_API_URL` env var (point to Render backend URL)
7. Deploy!

#### **Admin Dashboard → Vercel**
1. Go to [https://vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import same GitHub repo
4. Select `admin-dashboard` directory as root
5. Add `REACT_APP_API_URL` env var
6. Deploy on separate domain!

---

## 🔧 ENVIRONMENT VARIABLES SETUP

### Backend (Render)

Create these environment variables in your Render dashboard:

| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_ENV` | `production` | Fixed |
| `PORT` | `5000` | Fixed (Render assigns) |
| `JWT_SECRET` | Generate random string (min 32 chars) | Security critical |
| `SMTP_USER` | `bettingflash62@gmail.com` | Your email |
| `SMTP_PASS` | Your Gmail app password | See Gmail setup below |
| `SMTP_HOST` | `smtp.gmail.com` | Fixed |
| `SMTP_PORT` | `587` | Fixed |
| `ADMIN_EMAIL` | `bettingflash62@gmail.com` | Your email |
| `ADMIN_PHONE` | `07071198393` | Your phone |
| `API_KEY` | Random string | Optional, for API auth |

**How to get Gmail App Password:**
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer"
3. Google generates 16-char password
4. Copy it to `SMTP_PASS`

### Frontend (Vercel)

Create these environment variables in Vercel project settings:

| Variable | Value | Notes |
|----------|-------|-------|
| `REACT_APP_API_URL` | Your Render backend URL | e.g., `https://betting-flash-api.onrender.com` |

### Admin Dashboard (Vercel)

Create these environment variables in Vercel project settings:

| Variable | Value | Notes |
|----------|-------|-------|
| `REACT_APP_API_URL` | Your Render backend URL | Same as frontend |

---

## 📋 STEP-BY-STEP DEPLOYMENT

### Step 1: Prepare GitHub Repository

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial Betting Flash deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/surgeuji/BETTINGFLASH.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Render

1. **Create account** at [render.com](https://render.com)
2. **Connect GitHub** in dashboard
3. **Create new service:**
   - Click "New +" → "Web Service"
   - Select your `betting-flash` repo
   - Name: `betting-flash-api`
   - Root directory: `backend`
   - Runtime: `Node`
   - Build command: `npm install`
   - Start command: `npm start`
   - Plan: **Free** (auto-spins down after 15 min of inactivity)

4. **Add environment variables** in Render dashboard:
   ```
   NODE_ENV=production
   JWT_SECRET=<generate-random-string-32-chars>
   SMTP_USER=bettingflash62@gmail.com
   SMTP_PASS=<your-gmail-app-password>
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   ADMIN_EMAIL=bettingflash62@gmail.com
   ADMIN_PHONE=07071198393
   API_KEY=<generate-random-string>
   ```

5. **Deploy** - Render will auto-build and deploy
6. **Copy your URL** - Will be like `https://betting-flash-api.onrender.com`

### Step 3: Deploy Frontend to Vercel

1. **Create account** at [vercel.com](https://vercel.com)
2. **Create new project:**
   - Click "Add New" → "Project"
   - Select your `betting-flash` repo
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Environment Variable:
     ```
     REACT_APP_API_URL=https://betting-flash-api.onrender.com
     ```

3. **Deploy** - Vercel builds automatically
4. **Copy your URL** - Will be like `https://betting-flash.vercel.app`

### Step 4: Deploy Admin Dashboard to Vercel

1. **In Vercel, create another project:**
   - Click "Add New" → "Project"
   - Select same `betting-flash` repo
   - Framework Preset: `Create React App`
   - Root Directory: `admin-dashboard`
   - Build Command: `npm run build`
   - Environment Variable:
     ```
     REACT_APP_API_URL=https://betting-flash-api.onrender.com
     ```

2. **Deploy** - Vercel builds automatically
3. **Copy your URL** - Will be different domain, like `https://betting-flash-admin.vercel.app`

---

## ✅ VERIFICATION CHECKLIST

After deployment, verify everything works:

### Backend API (Render)

- [ ] Backend URL responds: `curl https://betting-flash-api.onrender.com/`
- [ ] Register endpoint: `POST /auth/register`
- [ ] Login endpoint: `POST /auth/login`
- [ ] Check admin logs in Render dashboard

### Frontend (Vercel)

- [ ] Frontend loads at `https://betting-flash.vercel.app`
- [ ] Register page displays (first screen)
- [ ] Can fill form with valid data
- [ ] API URL in network tab points to Render backend
- [ ] CSS loads (colors should be dark theme #0B0F14)

### Admin Dashboard (Vercel)

- [ ] Admin dashboard loads at different URL
- [ ] Login page displays
- [ ] Can attempt admin login
- [ ] API URL points to Render backend

### End-to-End Test

1. **Register a user** on frontend
2. **Check backend logs** on Render for user creation
3. **Login as admin** on admin dashboard
4. **View registered user** in Users page
5. **Perform admin operation** (freeze user, adjust balance, etc.)
6. **Check backend logs** for admin action logged

---

## 🔗 IMPORTANT URLS AFTER DEPLOYMENT

Save these URLs:

| App | URL Pattern |
|-----|-----------|
| **Backend API** | `https://[project-name].onrender.com` |
| **Frontend** | `https://[project-name].vercel.app` |
| **Admin Dashboard** | `https://[admin-project-name].vercel.app` |

---

## 🆘 TROUBLESHOOTING

### "Cannot GET /"
- **Cause**: Express not starting properly
- **Fix**: Check `backend/src/server.js` exists and starts on correct port

### "REACT_APP_API_URL is undefined"
- **Cause**: Environment variable not set in Vercel
- **Fix**: Add `REACT_APP_API_URL` to Vercel project settings → Environment Variables

### "Backend returning 401 Unauthorized"
- **Cause**: JWT_SECRET different between local and production
- **Fix**: Ensure same JWT_SECRET in Render environment variables

### "CORS errors"
- **Cause**: Frontend URL not whitelisted in backend
- **Fix**: Update `backend/src/app.js` to allow your Vercel URLs:
```javascript
const corsOptions = {
  origin: [
    'https://betting-flash.vercel.app',
    'https://betting-flash-admin.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
};
app.use(cors(corsOptions));
```

### "Email not sending"
- **Cause**: Gmail app password invalid
- **Fix**: 
  1. Regenerate app password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
  2. Update `SMTP_PASS` in Render environment variables
  3. Redeploy

---

## 📊 PRODUCTION MONITORING

### Render Dashboard
- View logs: Click service → "Logs"
- Monitor metrics: Click service → "Metrics"
- Set alerts for crashes

### Vercel Dashboard
- View deployments: Project → "Deployments"
- View logs: Click deployment → "Runtime Logs"
- Check analytics: Project → "Analytics"

---

## 🔒 SECURITY CHECKLIST

Before going live:

- [ ] `JWT_SECRET` is random, 32+ characters, unique per environment
- [ ] `SMTP_PASS` is app-specific password, not main Gmail password
- [ ] No hardcoded credentials in code (all in .env)
- [ ] CORS origins restricted to your domains only
- [ ] Frontend uses HTTPS (Vercel is HTTPS by default)
- [ ] Backend uses HTTPS (Render is HTTPS by default)
- [ ] Admin dashboard on different domain from frontend
- [ ] Admin credentials not shared with frontend domain

---

## 🚨 FREE TIER LIMITS

### Render (Backend)
- **Auto-spins down** after 15 minutes of inactivity (first request takes ~30 sec)
- **~500 hours/month** free compute (includes spin-down time)
- **1 GB RAM** per instance
- **Upgrade anytime** to keep instance always on

### Vercel (Frontend & Admin)
- **Unlimited deployments**
- **Unlimited preview builds**
- **Edge functions included**
- **No auto-shutdown** - always on

---

## 💰 UPGRADE PATH

When you're ready to go production:

1. **Render Backend**: Upgrade to Paid → Starter ($7/month)
   - Keeps service always running
   - Better performance
   - Better support

2. **Add Database**: Render → PostgreSQL ($15/month)
   - Replace in-memory stores
   - Update service layer to use real DB

3. **Vercel**: Already free tier is production-ready
   - Upgrade if you need Pro features ($20/month)

---

## 📞 SUPPORT CONTACTS

**For questions:**
- Render Support: [https://render.com/support](https://render.com/support)
- Vercel Support: [https://vercel.com/support](https://vercel.com/support)
- Gmail Issues: [Google Account Help](https://support.google.com/accounts)

---

**Deployment Date:** January 4, 2026
**Betting Flash Admin:** bettingflash62@gmail.com
**Backend Support Phone:** 07071198393
