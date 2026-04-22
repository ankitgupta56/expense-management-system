import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password })
};

// Expense API calls
export const expenseAPI = {
  addExpense: (title, amount, category, date, description) =>
    api.post('/expenses', { title, amount, category, date, description }),
  getExpenses: () =>
    api.get('/expenses'),
  getExpensesByCategory: (category) =>
    api.get(`/expenses/category/${category}`),
  updateExpense: (id, data) =>
    api.put(`/expenses/${id}`, data),
  deleteExpense: (id) =>
    api.delete(`/expenses/${id}`)
};

export default api;
