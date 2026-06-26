import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// 1. ENVIRONMENT CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, ".env") });

// 2. INITIALIZE APP & PORT
const app = express();
const PORT = 8001; 

// 3. CORS CONFIGURATION (Enabled globally for multi-origin local network validation)
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 4. ROUTES & ENDPOINTS (Preserved exactly)
const authRoutes = (await import("./authRoutes.js")).default;
app.use("/api/auth", authRoutes);

// Shared REST API Resource Pulls
app.get('/api/users', (req, res) => {
    // Write your mysql pool query here to pull active role records from 'users'
    res.json({ message: "Cashier list data goes here" });
});

// Primary POST Transaction Receiver
app.post('/api/sales-orders', (req, res) => {
    const { receipt_no } = req.body;
    
    // Here you execute your localized MySQL query insertions:
    // INSERT INTO sales_orders (receipt_no, cashier_id, total, ...) VALUES (?, ?, ?, ...)
    // Followed by multi-row insertion loops into your order_items table.
    
    console.log(`Successfully received transaction request for receipt: ${receipt_no}`);
    res.status(201).json({ success: true, message: "Sale processed inside POS module local database." });
});

// 5. START SERVER
app.listen(PORT, '0.0.0.0', () => {
    console.log(`POS Backend Server running securely on local network port ${PORT}`);
});
