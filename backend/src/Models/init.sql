-- Create Enum for Loan Status
CREATE TYPE loan_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'REPAID');
-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    -- Auto-incrementing user ID
    username VARCHAR(100) NOT NULL UNIQUE,
    -- Username must be unique
    password VARCHAR(255) NOT NULL,
    -- Password, should be hashed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of account creation
);
-- Create Loans Table
CREATE TABLE IF NOT EXISTS loans (
    id SERIAL PRIMARY KEY,
    -- Auto-incrementing loan ID
    user_id INT NOT NULL,
    -- Foreign key referencing the user
    full_name VARCHAR(255) NOT NULL,
    -- Full name of the loan applicant
    loan_amount DECIMAL(10, 2) NOT NULL,
    -- Amount of loan requested
    loan_tenure VARCHAR(50) NOT NULL,
    -- Loan tenure, like "12 months"
    employment_status VARCHAR(100) NOT NULL,
    -- Employment status of the applicant
    loan_status loan_status DEFAULT 'PENDING',
    -- Status of the loan application
    reason_for_loan VARCHAR(100),
    -- Reason for loan application
    employment_address1 VARCHAR(100),
    -- Address of employment
    employment_address2 VARCHAR(100),
    -- Address of employment
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Loan application timestamp
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Reference to users table
);
-- Indexes for faster lookup
CREATE INDEX idx_user_id ON loans(user_id);