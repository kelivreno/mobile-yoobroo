-- Add original_price column to products table
ALTER TABLE products ADD COLUMN original_price DECIMAL(10,2);

-- Update existing rows to set original_price equal to price
UPDATE products SET original_price = price WHERE original_price IS NULL;
