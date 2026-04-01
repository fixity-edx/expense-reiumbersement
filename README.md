# ExpenseFlow - AI-Powered Expense Reimbursement System

ExpenseFlow is a modern, full-stack MERN application designed to streamline employee expense reimbursements. It leverages **Artificial Intelligence** for receipt scanning and summarization, providing a seamless experience for both employees and administrators.

![ExpenseFlow Banner](https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop)

## 🚀 Key Features

### For Employees
*   **AI Receipt Scanning (OCR)**: Upload a receipt image, and our integrated **Tesseract.js** engine automatically extracts the text to auto-fill details.
*   **AI Summarization**: **Groq AI (Llama 3)** analyzes the expense description and amount to generate concise summaries.
*   **Smart Dashboard**: View the status of all claims (Pending, Approved, Rejected) in real-time.
*   **Category Management**: Organize expenses by Travel, Food, Office, Software, etc.

### For Administrators
*   **Visual Analytics**: Interactive charts (Recharts) showing spending by category and status distribution.
*   **one-Click Approvals**: Approve or reject claims instantly.
*   **Email Notifications**: Automated email alerts sent to employees upon status update (via Nodemailer).
*   **PDF Reports**: Export comprehensive expense reports to PDF for accounting.
*   **Secure Portal**: dedicated admin login area.

---

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS, Framer Motion (Animations), Lucide React (Icons), Recharts (Analytics), jsPDF (Reporting), Tesseract.js (OCR).
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Mongoose).
*   **Authentication**: JWT (JSON Web Tokens).
*   **AI & ML**: Groq SDK (Llama 3 Model), Tesseract.js.
*   **Email**: Nodemailer.

---

## 📦 Installation Guide

### Prerequisites
*   Node.js (v18+ recommended)
*   MongoDB (Local or Atlas)
*   Groq API Key (Free tier available)

### 1. Clone the Repository
```bash
git clone <repository_url>
cd Expenses_reumbersement
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

**Required Dependencies:**
*   `express`
*   `mongoose`
*   `dotenv`
*   `cors`
*   `bcryptjs`
*   `jsonwebtoken`
*   `groq-sdk`
*   `nodemailer`

**Environment Configuration:**
Create a `.env` file in the `backend` folder with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GROK_API_KEY=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
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123
MAIL_USER=your_gmail_address
MAIL_PASS=your_gmail_app_password
```
*(Note: `MAIL_USER` and `MAIL_PASS` are optional for development but required for sending actual emails.)*

**Start the Backend Server:**
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:
```bash
cd frontend
npm install
```
*If you encounter dependency conflicts, use:* `npm install --force`

**Required Dependencies:**
*   `react`, `react-dom`, `react-router-dom`
*   `axios`
*   `tailwindcss`, `postcss`, `autoprefixer`
*   `lucide-react`
*   `framer-motion`
*   `recharts`
*   `jspdf`, `jspdf-autotable`
*   `tesseract.js`

**Start the Frontend:**
```bash
npm run dev
```

---

## 🖥️ Usage

1.  **Landing Page**: Visit `http://localhost:5173/`.
2.  **Employee Registration**: Click "Get Started" to create a new employee account.
3.  **Submit Claim**: Go to your dashboard, upload a receipt or type details, and submit.
4.  **Admin Login**: 
    *   Click "Admin Login" in the navbar.
    *   **Email**: `admin@gmail.com`
    *   **Password**: `admin123`
5.  **Admin Actions**: View charts, approve claims, and export PDF reports.

## ⚠️ Troubleshooting

*   **Admin Login Invalid**: If the admin credentials don't work, run `node seed_admin.js` in the `backend` folder to force-create the admin user.
*   **Email Errors**: If you see email errors in the console, check your `MAIL_USER` and `MAIL_PASS` in `.env`.
*   **Vite Errors**: If you see "Module not found" for `recharts` or `jspdf`, ensure you ran `npm install` in the frontend folder.

---

## 🔮 Future Improvements
*   Integration with payment gateways for direct reimbursement.
*   Mobile application (React Native).
*   Multi-currency support.
