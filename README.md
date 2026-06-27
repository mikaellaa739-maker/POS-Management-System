# Module 2 — POS Management System

**Group 2 — Point of Sale Module**

## ⚠️ SETUP - GAWIN MUNA BAGO I-RUN

**Palitan ang IP sa `src/backend/inventoryClient.js`**

Buksan ang file `src/backend/inventoryClient.js`, hanapin ang line na:
```js
const INVENTORY_API = 'http://127.0.0.1:8000/api';
```
Palitan ang `127.0.0.1` ng IP ng laptop ng **Module 1 (Inventory)** group.

**Paano malaman IP:** Open CMD, i-type `ipconfig`, hanapin "IPv4 Address".

## Overview

A point-of-sale system with user roles (Admin, Cashier, Manager). Processes sales transactions, manages orders, and synchronizes inventory with Module 1.

**Tech Stack:** Express 5 + MySQL 8 + React 19 + MUI + Vite

## Location

```
/Users/janeventura/Downloads/POS-Module/
```

## Ports

| Service | Port |
|---------|------|
| Express Backend | 8002 |
| Vite Frontend | 5174 |

## Database

- **Name:** `pos_db` (auto-created on startup via `schema.sql`)
- **Host:** localhost
- **User:** root
- **Password:** `jane2005`

## Running

### Backend
```bash
cd /Users/janeventura/Downloads/POS-Module
npm install
npm run dev:server
```

### Frontend (separate terminal)
```bash
cd /Users/janeventura/Downloads/POS-Module
npm run dev
```

## Seed Users

| Role | Email | Password | Employee ID |
|------|-------|----------|-------------|
| **ADMIN** | admin@optistock.com | Admin123! | EID000001 |
| **CASHIER** | cashier1@optistock.com | Cashier123! | EID000002 |
| **MANAGER** | manager@optistock.com | Manager123! | EID000003 |

Login with either **Email** or **Employee ID**.

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new cashier |
| POST | `/api/auth/login` | Login (email or employee ID) |
| POST | `/api/auth/forgot-password` | Request password reset code |
| POST | `/api/auth/reset-password` | Reset password with code |
| POST | `/api/auth/verify` | Verify email |

### Sales
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/sales-orders` | Process a sale (deducts stock via M1) |
| GET | `/api/sales-orders` | List transactions (with filters) |
| GET | `/api/sales/today` | Today's sales summary |
| GET | `/api/sales/by-date?days=7` | Sales data by date range |

### Data (exposed to other modules)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List all POS users |
| GET | `/api/sales/products` | Products fetched from Inventory (M1) |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

## Cross-Module Integration

### What we consume (from Module 1 — Inventory):
| Endpoint | When |
|----------|------|
| `GET /api/products/dropdown/` | POS product list |
| `POST /api/products/deduct-stock/` | After every sale |

### Configure for Multi-Machine Setup

Edit `src/backend/inventoryClient.js`:
```js
const INVENTORY_API = 'http://<MODULE_1_IP>:8000/api';
```

### What we expose (to Module 3 — Dashboard):
- `GET /api/sales/today/` — sales summary
- `GET /api/sales-orders` — transaction list

## Files

| File | Purpose |
|------|---------|
| `src/backend/server.js` | Express backend |
| `src/backend/schema.sql` | Database schema (auto-runs) |
| `src/backend/inventoryClient.js` | HTTP client for Module 1 |
| `src/App.jsx` | Root React component |
| `src/pages/` | All POS pages (Login, Transaction, Payment, etc.) |
| `src/lib/api.js` | API client configuration |
| `.env` | Environment variables |
