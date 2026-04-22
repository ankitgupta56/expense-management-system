# Personal Expense Management System - MERN Stack

A complete full-stack application for managing personal expenses with user authentication, built with **MongoDB, Express, React, and Node.js (MERN)**.

---

## 📋 Features

### Part A: Backend Development
- ✅ MongoDB Schema for User with bcrypt password hashing
- ✅ MongoDB Schema for Expense with categories and references
- ✅ REST APIs for registration, login, and expense management
- ✅ Full CRUD operations for expenses

### Part B: Authentication & Middleware
- ✅ JWT-based authentication with token expiration
- ✅ Protected routes using auth middleware
- ✅ Secure password hashing with bcryptjs
- ✅ Request validation

### Part C: Frontend Development
- ✅ Register and Login pages with form validation
- ✅ Dashboard with expense list and statistics
- ✅ Responsive design using modern CSS
- ✅ JWT token storage in localStorage

### Part D: Functionality & Features
- ✅ Add and view expenses
- ✅ Filter expenses by category
- ✅ Display total expense amount
- ✅ Delete expenses
- ✅ Expense categorization (Food, Travel, Bills, Entertainment, Health, Shopping, Other)

---

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin requests support

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with Flexbox/Grid

---

## 📁 Project Structure

```
FSD_Practice_MSE_2/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema with bcrypt
│   │   └── Expense.js       # Expense schema
│   ├── routes/
│   │   ├── authRoutes.js    # Auth endpoints
│   │   └── expenseRoutes.js # Expense endpoints
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   └── expenseController.js # Expense logic
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── server.js            # Express server
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.js  # Registration page
│   │   │   ├── Login.js     # Login page
│   │   │   └── Dashboard.js # Main dashboard
│   │   ├── components/
│   │   │   ├── ExpenseForm.js   # Add expense form
│   │   │   └── ExpenseList.js   # Display expenses
│   │   ├── styles/
│   │   │   ├── Auth.css         # Auth pages styling
│   │   │   ├── Dashboard.css    # Dashboard styling
│   │   │   ├── ExpenseForm.css  # Form styling
│   │   │   └── ExpenseList.css  # List styling
│   │   ├── api.js           # Axios interceptor & API calls
│   │   ├── App.js           # Main component with routing
│   │   ├── index.js         # React entry point
│   │   └── App.css
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables in `.env`:**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/expense_management
   JWT_SECRET=your_super_secret_jwt_key_change_in_production
   ```

4. **Start MongoDB server** (if using local MongoDB):
   ```bash
   mongod
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables in `.env`:**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the React development server:**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

---

## 📡 API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Expense Routes (Protected - Require JWT Token)

#### Add Expense
```http
POST /api/expenses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Lunch at restaurant",
  "amount": 450.50,
  "category": "Food",
  "date": "2024-04-20",
  "description": "Lunch with team"
}

Response (201):
{
  "success": true,
  "message": "Expense added successfully",
  "expense": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Lunch at restaurant",
    "amount": 450.50,
    "category": "Food",
    "date": "2024-04-20T00:00:00.000Z",
    "description": "Lunch with team",
    "createdAt": "2024-04-20T10:30:00.000Z"
  }
}
```

#### Get All Expenses
```http
GET /api/expenses
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "count": 5,
  "total": "2450.50",
  "expenses": [...]
}
```

#### Get Expenses by Category
```http
GET /api/expenses/category/Food
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "count": 2,
  "total": "900.00",
  "expenses": [...]
}
```

#### Update Expense
```http
PUT /api/expenses/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "amount": 500
}

Response (200):
{
  "success": true,
  "message": "Expense updated successfully",
  "expense": {...}
}
```

#### Delete Expense
```http
DELETE /api/expenses/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Expense deleted successfully"
}
```

---

## 🔐 Authentication Flow

1. **User Registration**
   - User submits name, email, and password
   - Password is hashed using bcryptjs (salt rounds: 10)
   - User is stored in MongoDB
   - JWT token is generated and returned

2. **User Login**
   - User submits email and password
   - Query user by email and compare hashed password
   - If match, JWT token is generated
   - Token stored in localStorage on frontend

3. **Protected Routes**
   - Frontend sends token in `Authorization` header: `Bearer <token>`
   - Middleware verifies token using JWT_SECRET
   - If valid, request continues; if invalid, returns 401

---

## 📊 Database Schema

### User Schema
```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: Date.now)
}
```

### Expense Schema
```javascript
{
  userId: ObjectId (reference to User),
  title: String (required, max 100 chars),
  amount: Number (required, > 0),
  category: String (enum: Food, Travel, Bills, Entertainment, Health, Shopping, Other),
  date: Date (required, default: Date.now),
  description: String (max 500 chars),
  createdAt: Date (default: Date.now)
}
```

---

## 🎨 Features Demonstration

### Dashboard Features
- **Real-time Statistics**: View total expenses and entry count
- **Category Filtering**: Filter expenses by 8 different categories
- **Expense List**: Card-based display with category badges
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Add Expense**: Form with validation for adding new expenses
- **Delete Expense**: Quick delete with confirmation

### Security Features
- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes
- Secure token storage
- Email uniqueness validation

---

## 🧪 Testing the Application

### Example User Flow

1. **Register**: Go to `/register`, create an account
2. **Login**: Use credentials to login
3. **Add Expense**: Fill the form with expense details
4. **View**: See all expenses in the dashboard
5. **Filter**: Click on category buttons to filter
6. **Delete**: Click the delete button (✕) to remove expense

---

## ⚙️ Environment Variables

### Backend `.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense_management
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📝 Notes

- Change `JWT_SECRET` in production to a strong random string
- For production, use MongoDB Atlas instead of local MongoDB
- Set appropriate CORS origins in production
- Use environment-specific .env files for different deployments
- Consider adding rate limiting for security in production

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env

### CORS Error
- Backend CORS is enabled for all origins in development
- Restrict in production using CORS middleware options

### Token Expiration
- JWT tokens expire in 30 days
- Implement token refresh logic for extended sessions

### Frontend Not Connecting to Backend
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in .env

---

## 📄 License

This project is open source and available under the MIT License.

---

## ✅ Project Completion Status

- ✅ **Part A (6 marks)**: Backend development with MongoDB schemas and REST APIs
- ✅ **Part B (3 marks)**: JWT authentication and middleware implementation
- ✅ **Part C (4 marks)**: React frontend with pages and components
- ✅ **Part D (2 marks)**: Full functionality with bonus features (category filtering, totals)

**Total: 15 marks covered**

---

For questions or issues, please refer to the code comments and API documentation above.
