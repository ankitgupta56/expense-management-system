# 🚀 Quick Start Guide

## Start Backend (Terminal 1)

```bash
cd backend
npm install
npm run dev
```

**Backend runs on:** `http://localhost:5000`

---

## Start Frontend (Terminal 2)

```bash
cd frontend
npm install
npm start
```

**Frontend runs on:** `http://localhost:3000`

---

## Alternative: Using `npm` instead of `npm run dev` for production

```bash
# Backend production
cd backend
npm install
npm start

# Frontend production build
cd frontend
npm install
npm run build
npm install -g serve
serve -s build
```

---

## 🧪 Test the Application

1. **Open browser:** `http://localhost:3000`
2. **Register:** Click Register and create a new account
3. **Login:** Use your credentials to login
4. **Add Expense:** Click "Add New Expense" and fill in the form
5. **View & Filter:** See expenses in the dashboard, filter by category
6. **Delete:** Click ✕ to delete an expense

---

## 📱 Features to Test

- ✅ Registration with email validation
- ✅ Secure login with password hashing
- ✅ Add expenses with title, amount, category, date
- ✅ View all your expenses
- ✅ Filter by category (Food, Travel, Bills, Entertainment, Health, Shopping, Other)
- ✅ See total expenses and count
- ✅ Delete expenses
- ✅ Logout

---

## 🔧 Configuration

### Backend `.env` (Already configured)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense_management
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

### Frontend `.env` (Already configured)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## ⚠️ Prerequisites

- Node.js installed (https://nodejs.org/)
- MongoDB running locally or MongoDB Atlas connection

---

## 📞 Common Issues

| Issue | Solution |
|-------|----------|
| MongoDB Error | Make sure MongoDB is running: `mongod` |
| CORS Error | Ensure backend is on port 5000 |
| Port Already in Use | Change PORT in .env for backend |
| npm install fails | Delete `node_modules` and `package-lock.json`, then try again |

---

## 🎯 API Quick Test (Using Postman/cURL)

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"123456"}'
```

### Add Expense (Replace TOKEN with actual token)
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Lunch","amount":500,"category":"Food","date":"2024-04-20"}'
```

### Get Expenses (Replace TOKEN with actual token)
```bash
curl http://localhost:5000/api/expenses \
  -H "Authorization: Bearer TOKEN"
```

---

Happy coding! 🎉
