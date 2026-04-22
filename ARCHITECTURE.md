# 🏗️ System Architecture & Data Flow

## Overall System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     PERSONAL EXPENSE MANAGEMENT SYSTEM          │
└─────────────────────────────────────────────────────────────────┘

                            FRONTEND (React)
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  Browser (localhost:3000)                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                      App Router                            │ │
│  │  ┌──────────────┐ ┌──────────┐ ┌──────────────────┐      │ │
│  │  │  Register    │ │  Login   │ │   Dashboard      │      │ │
│  │  │   Page       │ │   Page   │ │   (Protected)    │      │ │
│  │  └──────────────┘ └──────────┘ └──────────────────┘      │ │
│  │         │                            │                     │ │
│  │         └────────────┬───────────────┘                     │ │
│  │                      │                                     │ │
│  │              API calls via Axios                           │ │
│  │         (With JWT Interceptor)                            │ │
│  │                      │                                     │ │
│  │           ┌──────────┴──────────┐                          │ │
│  │           │                     │                          │ │
│  │        localStorage         Components:                    │ │
│  │      (token, user)        • ExpenseForm                   │ │
│  │                           • ExpenseList                   │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Styling with CSS3 (Flexbox/Grid)                              │
│  • Responsive design                                            │
│  • Gradient backgrounds                                         │
│  • Interactive components                                       │
└──────────────────────────────────────────────────────────────────┘
                            │  HTTP/HTTPS
                            │  JSON payloads
                            ▼
                    BACKEND (Node.js/Express)
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  Server (localhost:5000)                                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Express App                             │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │              Routes & Middleware                     │ │ │
│  │  │                                                      │ │ │
│  │  │  POST /api/auth/register  ──┐                       │ │ │
│  │  │  POST /api/auth/login     ──┼──> authController    │ │ │
│  │  │                             │                       │ │ │
│  │  │  POST /api/expenses ──┐    │                        │ │ │
│  │  │  GET /api/expenses  ──┼──┤├──> expenseController   │ │ │
│  │  │  PUT /api/expenses/:id  │  (Protected with auth)   │ │ │
│  │  │  DELETE /api/expenses/:id┘                         │ │ │
│  │  │                                                      │ │ │
│  │  │  ┌─ Middleware ─┐                                  │ │ │
│  │  │  │ • CORS        │                                  │ │ │
│  │  │  │ • JSON Parser │                                  │ │ │
│  │  │  │ • Auth Check  │                                  │ │ │
│  │  │  └────────────────┘                                 │ │ │
│  │  │                                                      │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                      │                                     │ │
│  │  ┌──────────────────┴─────────────────────┐              │ │
│  │  │                                         │              │ │
│  │  ▼                                         ▼              │ │
│  │  Models                              Controllers         │ │
│  │  • User.js                           • authController    │ │
│  │  • Expense.js                        • expenseController │ │
│  │                                                           │ │
│  │  • Validation                                            │ │
│  │  • Hooks (bcrypt hashing)                               │ │
│  │  • Methods (matchPassword)                              │ │
│  │                                                           │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                            │
                            │  Mongoose ODM
                            │  CRUD Operations
                            ▼
                    DATABASE (MongoDB)
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  MongoDB Instance (localhost:27017)                             │
│  Database: expense_management                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Collection: users                                         │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ {                                                    │ │ │
│  │  │   _id: ObjectId,                                     │ │ │
│  │  │   name: String,                                      │ │ │
│  │  │   email: String (unique index),                      │ │ │
│  │  │   password: String (bcrypt hash),                    │ │ │
│  │  │   createdAt: Date                                    │ │ │
│  │  │ }                                                    │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                             │ │
│  │  Collection: expenses                                      │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ {                                                    │ │ │
│  │  │   _id: ObjectId,                                     │ │ │
│  │  │   userId: ObjectId (references users),              │ │ │
│  │  │   title: String,                                     │ │ │
│  │  │   amount: Number,                                    │ │ │
│  │  │   category: String (enum),                           │ │ │
│  │  │   date: Date,                                        │ │ │
│  │  │   description: String,                               │ │ │
│  │  │   createdAt: Date                                    │ │ │
│  │  │ }                                                    │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Authentication Flow

```
REGISTRATION
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  User enters: name, email, password                        │
│                         │                                  │
│                         ▼                                  │
│              POST /api/auth/register                       │
│                         │                                  │
│                         ▼                                  │
│        ┌────────────────────────────────┐                  │
│        │  Validate input                │                  │
│        │  • Check required fields       │                  │
│        │  • Check email format          │                  │
│        └────────────────────────────────┘                  │
│                         │                                  │
│                         ▼                                  │
│        ┌────────────────────────────────┐                  │
│        │  Check if email exists         │                  │
│        │  Query: findOne({email})       │                  │
│        └────────────────────────────────┘                  │
│                    Yes │ No                                │
│                  │      └─→ Continue                       │
│        ┌─────────▼──────┐                                  │
│        │ Return Error   │                                  │
│        │ "Email exists" │                                  │
│        └────────────────┘                                  │
│                         │                                  │
│                         ▼                                  │
│        ┌────────────────────────────────┐                  │
│        │  Hash password with bcryptjs  │                  │
│        │  • Generate salt (10 rounds)   │                  │
│        │  • Hash password + salt        │                  │
│        └────────────────────────────────┘                  │
│                         │                                  │
│                         ▼                                  │
│        ┌────────────────────────────────┐                  │
│        │  Save user to MongoDB          │                  │
│        │  db.users.insertOne(user)      │                  │
│        └────────────────────────────────┘                  │
│                         │                                  │
│                         ▼                                  │
│        ┌────────────────────────────────┐                  │
│        │  Generate JWT token            │                  │
│        │  jwt.sign({id}, JWT_SECRET)    │                  │
│        │  Expires in 30 days            │                  │
│        └────────────────────────────────┘                  │
│                         │                                  │
│                         ▼                                  │
│        ┌────────────────────────────────┐                  │
│        │  Return 201 + token + user     │                  │
│        │  Store token in localStorage   │                  │
│        └────────────────────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘


LOGIN
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  User enters: email, password                              │
│                         │                                  │
│                         ▼                                  │
│              POST /api/auth/login                          │
│                         │                                  │
│                         ▼                                  │
│        ┌────────────────────────────────┐                  │
│        │  Validate input                │                  │
│        │  • Check required fields       │                  │
│        └────────────────────────────────┘                  │
│                         │                                  │
│                         ▼                                  │
│        ┌────────────────────────────────┐                  │
│        │  Find user by email            │                  │
│        │  Select password field         │                  │
│        │  db.users.findOne({email})     │                  │
│        └────────────────────────────────┘                  │
│                  User exists?                              │
│                    Yes │ No                                │
│                   │     └─→ Return Error                   │
│        ┌──────────▼──────────┐                             │
│        │ "Invalid credentials"│                             │
│        └──────────────────────┘                             │
│                         │                                  │
│                         ▼                                  │
│        ┌────────────────────────────────┐                  │
│        │  Compare passwords             │                  │
│        │  bcrypt.compare(              │                  │
│        │    enteredPw, hashedPw)       │                  │
│        └────────────────────────────────┘                  │
│                    Match?                                  │
│                    Yes │ No                                │
│                   │     └─→ Return Error                   │
│        ┌──────────▼──────────┐                             │
│        │ "Invalid credentials"│                             │
│        └──────────────────────┘                             │
│                         │                                  │
│                         ▼                                  │
│        ┌────────────────────────────────┐                  │
│        │  Generate JWT token            │                  │
│        │  jwt.sign({id}, JWT_SECRET)    │                  │
│        └────────────────────────────────┘                  │
│                         │                                  │
│                         ▼                                  │
│        ┌────────────────────────────────┐                  │
│        │  Return 200 + token + user     │                  │
│        │  Store token in localStorage   │                  │
│        └────────────────────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛡️ Protected Request Flow

```
ADD EXPENSE REQUEST
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Frontend: User submits expense form                       │
│                         │                                  │
│                         ▼                                  │
│     Retrieve token from localStorage                       │
│                         │                                  │
│                         ▼                                  │
│  POST /api/expenses                                        │
│  Header: Authorization: Bearer <token>                     │
│                         │                                  │
│                         ▼ (Network)                        │
│                                                             │
│  Backend: Express receives request                         │
│                         │                                  │
│                         ▼                                  │
│  auth Middleware (protect)                                 │
│  ┌────────────────────────────────┐                        │
│  │ 1. Extract token from header   │                        │
│  │ 2. Verify JWT signature        │                        │
│  │ 3. Decode token to get userId  │                        │
│  │ 4. Attach user to req object   │                        │
│  └────────────────────────────────┘                        │
│                    Valid?                                  │
│                    Yes │ No                                │
│                   │     └─→ Return 401 Unauthorized        │
│                   │                                        │
│                   ▼                                        │
│  addExpense Controller                                     │
│  ┌────────────────────────────────┐                        │
│  │ 1. Validate form data          │                        │
│  │ 2. Create expense object       │                        │
│  │ 3. Set userId = req.user.id    │                        │
│  │ 4. Save to database            │                        │
│  └────────────────────────────────┘                        │
│                         │                                  │
│                         ▼                                  │
│  MongoDB: Save expense document                           │
│  └─ Creates index on userId for queries                    │
│                         │                                  │
│                         ▼                                  │
│  Return 201 + saved expense object                         │
│                         │                                  │
│                         ▼ (Network)                        │
│                                                             │
│  Frontend: Update UI with new expense                      │
│            Add to expense list                             │
│            Clear form & refresh total                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        App.js (Router)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐    ┌──────────┐    ┌──────────────────┐  │
│   │  Register   │    │  Login   │    │   Dashboard      │  │
│   │   Page      │    │   Page   │    │    (Protected)   │  │
│   └─────────────┘    └──────────┘    └──────────────────┘  │
│                                              │               │
│                                              │               │
│                                      ┌───────┴────────┐     │
│                                      │                │     │
│                                      ▼                ▼     │
│                              ┌─────────────┐   ┌──────────┐ │
│                              │ ExpenseForm │   │Expense   │ │
│                              │             │   │List      │ │
│                              └─────────────┘   └──────────┘ │
│                                      │                │     │
│                                      │                │     │
│                    ┌─────────────────┴─────────────────┘    │
│                    │                                         │
│                    ▼                                         │
│               api.js (Axios)                                 │
│               ┌────────────────┐                             │
│               │ authAPI        │                             │
│               │ expenseAPI     │                             │
│               │ (Interceptor)  │                             │
│               └────────────────┘                             │
│                    │                                         │
│                    ▼                                         │
│               Backend API                                    │
│               (REST Endpoints)                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📈 Data Flow: Add Expense

```
User Input (ExpenseForm)
        │
        ├─ title: "Lunch"
        ├─ amount: 500
        ├─ category: "Food"
        ├─ date: "2024-04-20"
        └─ description: "Lunch with team"
        │
        ▼
Form Validation (Client-side)
        │
        ▼
API Call: expenseAPI.addExpense()
        │
        ├─ Request Body: {title, amount, category, date, description}
        ├─ Header: Authorization: Bearer <token>
        │
        ▼
Backend: POST /api/expenses (with protect middleware)
        │
        ├─ Verify JWT token
        ├─ Extract userId from token
        │
        ▼
Expense Controller: addExpense()
        │
        ├─ Validate form data
        ├─ Create Expense document with userId
        │
        ▼
MongoDB: Save to expenses collection
        │
        ├─ Generated _id
        ├─ All fields including userId
        │
        ▼
Return Response (201)
        │
        ├─ success: true
        ├─ expense: {...full expense object...}
        │
        ▼
Frontend: Handle Response
        │
        ├─ Add expense to state
        ├─ Refresh totals
        ├─ Clear form
        ├─ Update UI
        │
        ▼
User sees new expense in list
```

---

## 🔐 Security Layers

```
LAYER 1: Password Security
├─ Bcryptjs with 10 salt rounds
├─ Pre-save hooks hash before storage
└─ matchPassword() handles comparison

LAYER 2: Authentication
├─ JWT token generation on login/register
├─ 30-day token expiration
└─ Secure token storage in localStorage

LAYER 3: Route Protection
├─ Auth middleware on all expense routes
├─ Token validation with JWT_SECRET
└─ User info attached to request

LAYER 4: Authorization
├─ Ownership check (userId match)
├─ Users can only access their expenses
└─ Delete/update only own resources

LAYER 5: Data Validation
├─ Email format validation
├─ Required field checking
├─ Amount minimum validation
└─ String length limits
```

---

## 💾 Database Relationships

```
┌──────────────────┐
│     users        │
├──────────────────┤
│ _id (PK) ────────┼────────────────────┐
│ name             │                    │
│ email (unique)   │                    │
│ password         │                    │
│ createdAt        │                    │
└──────────────────┘                    │
                                        │
                                    ┌───┴──────────────┐
                                    │ One-to-Many      │
                                    │ Relationship     │
                                    │                  │
┌──────────────────┐                │
│    expenses      │                │
├──────────────────┤                │
│ _id (PK)         │                │
│ userId (FK) ─────┼────────────────┘
│ title            │
│ amount           │
│ category         │
│ date             │
│ description      │
│ createdAt        │
└──────────────────┘

- One user can have many expenses
- Each expense belongs to exactly one user
- Foreign key: expenses.userId → users._id
```

---

This architecture provides:
✅ Clear separation of concerns
✅ Scalable design
✅ Security at multiple layers
✅ Easy to test and maintain
✅ Follows MERN best practices
