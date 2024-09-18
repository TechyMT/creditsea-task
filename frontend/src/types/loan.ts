export type LoanStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

// Define the Loan interface
export interface LoanFormData {
  id?: number; // Auto-incrementing loan ID
  user_id?: number; // Foreign key referencing the user
  full_name: string; // Full name of the loan applicant
  loan_amount: number; // Amount of loan requested
  loan_tenure: number; // Loan tenure, like "12 months"
  employment_status: string; // Employment status of the applicant
  reason_for_loan: string; // Reason for the loan application
  employment_address1: string; // Employment address line 1
  employment_address2: string; // Employment
  loan_status?: LoanStatus; // Status of the loan application
  created_at?: string; // Loan application timestamp in ISO format
}