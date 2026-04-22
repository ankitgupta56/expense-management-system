import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { expenseAPI } from '../api';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const categories = ['All', 'Food', 'Travel', 'Bills', 'Entertainment', 'Health', 'Shopping', 'Other'];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchExpenses();
  }, [navigate]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await expenseAPI.getExpenses();
      if (response.data.success) {
        setExpenses(response.data.expenses);
        setFilteredExpenses(response.data.expenses);
        setTotal(parseFloat(response.data.total));
      }
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const response = await expenseAPI.addExpense(
        expenseData.title,
        expenseData.amount,
        expenseData.category,
        expenseData.date,
        expenseData.description
      );
      if (response.data.success) {
        fetchExpenses();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const response = await expenseAPI.deleteExpense(id);
        if (response.data.success) {
          fetchExpenses();
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete expense');
      }
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredExpenses(expenses);
      const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      setTotal(totalAmount);
    } else {
      const filtered = expenses.filter(exp => exp.category === category);
      setFilteredExpenses(filtered);
      const totalAmount = filtered.reduce((sum, exp) => sum + exp.amount, 0);
      setTotal(totalAmount);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-content">
          <h1>Expense Management System</h1>
          <div className="user-section">
            <span className="user-name">Welcome, {user?.name}!</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="left-section">
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>

        <div className="right-section">
          <div className="stats-box">
            <div className="stat-item">
              <h3>Total Expenses</h3>
              <p className="total-amount">₹{total.toFixed(2)}</p>
            </div>
            <div className="stat-item">
              <h3>Total Entries</h3>
              <p className="total-count">{filteredExpenses.length}</p>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="category-filters">
            <h3>Filter by Category:</h3>
            <div className="filter-buttons">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => handleCategoryFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <ExpenseList
            expenses={filteredExpenses}
            onDeleteExpense={handleDeleteExpense}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
