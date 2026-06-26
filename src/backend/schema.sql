CREATE DATABASE IF NOT EXISTS pos_system;
USE pos_system;

SET FOREIGN_KEY_CHECKS = 0;

-- =========================
-- USERS (Shared across modules)
-- =========================
CREATE TABLE users (
    id VARCHAR(20) PRIMARY KEY, -- Aligned with picture's VARCHAR(20) FK users.id
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'CASHIER', 'MANAGER') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================
-- CATEGORIES
-- =========================
CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================
-- PRODUCTS (Shared/referenced by POS)
-- =========================
CREATE TABLE products (
    id VARCHAR(20) PRIMARY KEY, -- Aligned with picture's products.id
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    cost DECIMAL(10,2) DEFAULT 0,
    category_id VARCHAR(36),
    stock_quantity INT DEFAULT 0,
    reorder_level INT DEFAULT 10,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB;

-- =========================
-- POS: SALES ORDERS (Exact match to image)
-- =========================
CREATE TABLE sales_orders (
    receipt_no VARCHAR(30) PRIMARY KEY, -- Matches blueprint
    cashier_id VARCHAR(20),
    total DECIMAL(12,2) NOT NULL,
    paid DECIMAL(12,2) NOT NULL,
    change_given DECIMAL(12,2) NOT NULL,
    payment_method ENUM('Cash', 'GCash', 'Card') NOT NULL,
    status ENUM('Completed', 'Refunded', 'Cancelled') NOT NULL,
    items_count INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cashier_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- =========================
-- POS: ORDER ITEMS (Exact match to image)
-- =========================
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    receipt_no VARCHAR(30),
    product_id VARCHAR(20),
    qty INT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    subtotal DECIMAL(12,2) GENERATED ALWAYS AS (qty * price) STORED, -- Generated as specified in image
    FOREIGN KEY (receipt_no) REFERENCES sales_orders(receipt_no) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB;

-- =========================
-- POS: DAILY SALES SUMMARY (Exact match to image)
-- =========================
CREATE TABLE daily_sales_summary (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sale_date DATE UNIQUE NOT NULL,
    total_revenue DECIMAL(14,2) NOT NULL,
    total_transactions INT NOT NULL,
    total_items_sold INT NOT NULL
) ENGINE=InnoDB;

-- =========================
-- POS: PRODUCT SALES SUMMARY (Exact match to image)
-- =========================
CREATE TABLE product_sales_summary (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(20),
    sale_date DATE NOT NULL,
    quantity_sold INT NOT NULL,
    revenue DECIMAL(14,2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB;

-- =========================
-- CASH SESSIONS
-- =========================
CREATE TABLE cash_sessions (
    id VARCHAR(36) PRIMARY KEY,
    cashier_id VARCHAR(20),
    opening_cash DECIMAL(10,2) NOT NULL,
    closing_cash DECIMAL(10,2) DEFAULT 0,
    expected_cash DECIMAL(10,2) DEFAULT 0,
    actual_cash DECIMAL(10,2) DEFAULT 0,
    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP NULL,
    FOREIGN KEY (cashier_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- =========================
-- SUPPLIERS
-- =========================
CREATE TABLE suppliers (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    contact VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================
-- PURCHASE ORDERS
-- =========================
CREATE TABLE purchase_orders (
    id VARCHAR(36) PRIMARY KEY,
    supplier_id VARCHAR(36),
    status ENUM('PENDING', 'RECEIVED', 'CANCELLED') DEFAULT 'PENDING',
    total_cost DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
) ENGINE=InnoDB;

-- =========================
-- PURCHASE ORDER ITEMS
-- =========================
CREATE TABLE purchase_order_items (
    id VARCHAR(36) PRIMARY KEY,
    purchase_order_id VARCHAR(36),
    product_id VARCHAR(20),
    quantity INT NOT NULL,
    cost DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB;

-- =========================
-- EMAIL VERIFICATIONS
-- =========================
CREATE TABLE email_verifications (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL,
    expires_at DATETIME NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SET FOREIGN_KEY_CHECKS = 1;