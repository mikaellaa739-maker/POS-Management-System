CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id VARCHAR(20) NOT NULL UNIQUE,
  first_name VARCHAR(50) NOT NULL,
  middle_name VARCHAR(50) DEFAULT '',
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  contact_number VARCHAR(11) NOT NULL,
  address VARCHAR(100) NOT NULL,
  role ENUM('ADMIN', 'CASHIER', 'MANAGER') NOT NULL DEFAULT 'CASHIER',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sales_orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  receipt_no VARCHAR(20) NOT NULL UNIQUE,
  cashier_id VARCHAR(20) NOT NULL,
  cashier_name VARCHAR(100) NOT NULL DEFAULT '',
  total DECIMAL(10,2) NOT NULL,
  paid DECIMAL(10,2) NOT NULL,
  change_given DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  payment_method ENUM('Cash', 'GCash', 'Card') NOT NULL DEFAULT 'Cash',
  status ENUM('Completed', 'Voided') NOT NULL DEFAULT 'Completed',
  items_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cashier_id) REFERENCES users(employee_id) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  receipt_no VARCHAR(20) NOT NULL,
  product_id VARCHAR(20) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  qty INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (receipt_no) REFERENCES sales_orders(receipt_no) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_sales_orders_created_at ON sales_orders(created_at);
CREATE INDEX idx_sales_orders_cashier_id ON sales_orders(cashier_id);
CREATE INDEX idx_order_items_receipt_no ON order_items(receipt_no);

INSERT IGNORE INTO users (employee_id, first_name, middle_name, last_name, email, password, contact_number, address, role) VALUES
('EID000001', 'Admin', '', 'User', 'admin@optistock.com', '$2b$10$RJlFlnfuOOjzZ2AQrGhdiuOX1ZBOVg.aq0.pGF2TPARdwh.RwalW2', '09123456789', 'Admin Office', 'ADMIN'),
('EID000002', 'Cashier', '', 'One', 'cashier1@optistock.com', '$2b$10$vNl.31GN.u5qdocmaYlo5eDaf5oW8ZmLRnUXjMfZZsh54omHt8vLu', '09123456788', 'Cashier Station 1', 'CASHIER'),
('EID000003', 'Manager', '', 'User', 'manager@optistock.com', '$2b$10$5iHLI9BZdtJfuzHe3Y/ZZecN/Q7OZRIkF9nlF2FY13sgAqQ1KWcyC', '09123456787', 'Manager Office', 'MANAGER');
