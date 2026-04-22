# Project Structure Details

## Complete File Listing

```
FSD_Practice_MSE_2/
│
├── README.md                           # Main documentation
├── QUICKSTART.md                       # Quick start guide
│
├── backend/
│   ├── package.json                    # Dependencies: express, mongoose, bcryptjs, jsonwebtoken, cors
│   ├── .env                            # Environment variables (MongoDB URI, JWT secret)
│   ├── .gitignore                      # Git ignore patterns
│   ├── server.js                       # Express server setup and MongoDB connection
│   │
│   ├── models/
│   │   ├── User.js                     # User schema with bcrypt password hashing
│   │   │   └── Fields: name, email (unique), password, createdAt
│   │   │   └── Methods: matchPassword() for comparing passwords
│   │   │
│   │   └── Expense.js                  # Expense schema with category enumeration
│   │       └── Fields: userId, title, amount, category, date, description, createdAt
│   │       └── Categories: Food, Travel, Bills, Entertainment, Health, Shopping, Other
│   │
│   ├── controllers/
│   │   ├── authController.js           # Authentication logic
│   │   │   ├── register()              # Create new user with hashed password
│   │   │   └── login()                 # Authenticate and generate JWT token
│   │   │
│   │   └── expenseController.js        # Expense management logic
│   │       ├── addExpense()            # Create new expense (Protected)
│   │       ├── getExpenses()           # Retrieve all user expenses with total
│   │       ├── getExpensesByCategory() # Filter expenses by category
│   │       ├── updateExpense()         # Modify existing expense
│   │       └── deleteExpense()         # Remove expense
│   │
│   ├── routes/
│   │   ├── authRoutes.js               # Authentication endpoints
│   │   │   ├── POST /api/auth/register
│   │   │   └── POST /api/auth/login
│   │   │
│   │   └── expenseRoutes.js            # Expense endpoints (all protected with JWT)
│   │       ├── POST /api/expenses
│   │       ├── GET /api/expenses
│   │       ├── GET /api/expenses/category/:category
│   │       ├── PUT /api/expenses/:id
│   │       └── DELETE /api/expenses/:id
│   │
│   └── middleware/
│       └── auth.js                     # JWT verification middleware
│           └── protect()               # Verify token and attach user to request
│
├── frontend/
│   ├── package.json                    # Dependencies: react, react-router-dom, axios
│   ├── .env                            # React app configuration (API URL)
│   ├── .gitignore                      # Git ignore patterns
│   │
│   ├── public/
│   │   └── index.html                  # HTML entry point
│   │
│   └── src/
│       ├── index.js                    # React DOM render entry point
│       ├── index.css                   # Global styles and CSS reset
│       ├── App.js                      # Main app component with routing
│       ├── App.css                     # App component styles
│       │
│       ├── api.js                      # Axios instance with JWT interceptor
│       │   ├── authAPI                 # register(), login()
│       │   └── expenseAPI              # add, get, filter, update, delete
│       │
│       ├── pages/
│       │   ├── Register.js             # User registration page
│       │   │   └── Form: name, email, password with validation
│       │   │
│       │   ├── Login.js                # User login page
│       │   │   └── Form: email, password with error handling
│       │   │
│       │   └── Dashboard.js            # Main expense management dashboard
│       │       ├── Displays user stats (total, count)
│       │       ├── Category filter buttons
│       │       ├── Uses ExpenseForm component
│       │       ├── Uses ExpenseList component
│       │       └── Includes logout button
│       │
│       ├── components/
│       │   ├── ExpenseForm.js          # Add expense form component
│       │   │   ├── Fields: title, amount, category, date, description
│       │   │   └── Form validation and submission
│       │   │
│       │   └── ExpenseList.js          # Display expenses in card grid
│       │       ├── Shows 2+ expenses per row
│       │       ├── Category badges with colors
│       │       ├── Delete button with confirmation
│       │       └── Responsive card design
│       │
│       └── styles/
│           ├── Auth.css                # Register and Login page styling
│           │   └── Form styling, error messages, buttons
│           │
│           ├── Dashboard.css           # Dashboard layout with sticky form
│           │   ├── Header with gradient
│           │   ├── Two-column grid layout
│           │   ├── Statistics boxes
│           │   └── Category filter buttons
│           │
│           ├── ExpenseForm.css         # Add expense form styling
│           │   └── Input fields, labels, submit button
│           │
│           └── ExpenseList.css         # Expense cards and list styling
│               ├── Card grid layout
│               ├── Category badges with colors
│               └── Responsive grid that becomes single column on mobile
```

---

## 🎯 Key Implementation Details

### Backend Architecture

1. **User Model**
   - Email uniqueness enforced by MongoDB index
   - Password automatically hashed before save using bcryptjs
   - `matchPassword()` method for login verification

2. **Auth Controller**
   - `register()`: Validates input, checks duplicate email, creates user, returns JWT
   - `login()`: Validates credentials, compares hashed password, returns JWT

3. **Auth Middleware**
   - Extracts token from `Authorization: Bearer <token>` header
   - Verifies token signature using JWT_SECRET
   - Attaches decoded user info to req.user

4. **Expense Operations**
   - All routes protected with `protect` middleware
   - User can only view/edit/delete their own expenses
   - Automatic total calculation on GET requests

### Frontend Architecture

1. **Routing**
   - `/register` → Register page (public)
   - `/login` → Login page (public)
   - `/dashboard` → Dashboard (protected, redirects to login if no token)
   - `/` → Redirects to dashboard if logged in, else login

2. **State Management**
   - localStorage for token persistence
   - Component state for forms and expense lists
   - Axios interceptor automatically adds token to requests

3. **Responsive Design**
   - Desktop: Two-column layout (form left, list right)
   - Tablet: Responsive grid adjusts
   - Mobile: Single column with sticky form

---

## 📊 Database Collections

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique index),
  password: String (bcrypt hash),
  createdAt: Date
}
```

### Expenses Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (references User),
  title: String,
  amount: Number,
  category: String,
  date: Date,
  description: String,
  createdAt: Date
}
```

---

## 🔐 Security Features Implemented

1. **Password Security**
   - Bcryptjs with 10 salt rounds
   - Passwords never logged or returned in responses
   - Pre-save hook ensures hashing

2. **Authentication**
   - JWT with 30-day expiration
   - Token stored in secure localStorage
   - Token required for all expense operations

3. **Authorization**
   - Middleware verifies token before processing
   - Users can only access their own expenses
   - Ownership check before update/delete

4. **Data Validation**
   - Email validation on user creation
   - Required fields validation
   - Amount minimum validation (> 0)
   - String length limits

---

## ✨ Responsive Features

1. **Mobile-First Design**
   - Hamburger-ready header (can be extended)
   - Single column expense cards on mobile
   - Touch-friendly buttons

2. **Desktop Experience**
   - Two-column dashboard layout
   - Sticky expense form for easy access
   - Multi-column card grid for expenses

3. **Accessibility**
   - Semantic HTML
   - Proper form labels
   - Color-coded categories
   - Clear error messages

---

All files are production-ready and follow industry best practices!
