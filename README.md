# CreditSea Task

## Tech Stack

- **Frontend:**
  - **Next.js** (React framework)
  - **TypeScript**
  - **Tailwind CSS**
  - **Radix UI**

- **Backend:**
  - **Node.js**
  - **TypeScript**
  - **Express**
  - **PostgreSQL** (for database management)

## Features

### User Interface
- **Login/Registration**: Allows users to log in or register.
- **Dashboard**: Users can view their loans and apply for new ones.
- **Loan Application**: Users can fill out and submit a loan application form.

### Admin Portal
- **Dashboard**: Admins can view all submitted loan applications.
- **Application Management**: Admins can change the status of loan applications (Approved, Pending, Repaid, Rejected).
- **Statistics**: Displays backend statistics for loan applications.

### Demo

[Drive Link]("https://drive.google.com/file/d/1RUrIMeFsdVa6JCwY0BOPgql2WNpIxY-h/view?usp=sharing")

## Routes

### User Routes
- **Login/Registration**: `/login` or `/register`
- **Dashboard**: `/`
- **Apply Loan**: Accessible via the dashboard interface

### Admin Routes
- **Admin Portal**: `/admin`
  - **View Applications**: Lists all submitted loan applications.
  - **Update Application Status**: Change the status of applications (Approved, Pending, Repaid, Rejected).
  - **Statistics**: Displays statistics on loan applications.

## Usage

1. **User Login/Registration:**
   - Navigate to `/login` or `/register` and enter credentials.

2. **User Dashboard:**
   - Access `/` to view existing loans or apply for a new loan.
   - Fill out and submit the loan application form from the dashboard.

3. **Admin Portal:**
   - Access via `/admin`.
   - Review submitted loan applications and update their status.
   - View loan statistics.

## Setup

1. **Frontend:**
   - Install dependencies: `npm install`
   - Run the development server: `npm run dev`

2. **Backend:**
   - Install dependencies: `npm install`
   - Run the server: `npm start`

Ensure PostgreSQL is properly configured and the necessary database tables are created.

## Deployment

- **Frontend**: Deployed on Netlify
- **Backend**: Deployed on Render
