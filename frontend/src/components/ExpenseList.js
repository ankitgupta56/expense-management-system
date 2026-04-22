import React from 'react';
import '../styles/ExpenseList.css';

const ExpenseList = ({ expenses, onDeleteExpense, loading }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Food': '#FF6B6B',
      'Travel': '#4ECDC4',
      'Bills': '#45B7D1',
      'Entertainment': '#FFA07A',
      'Health': '#98D8C8',
      'Shopping': '#F7DC6F',
      'Other': '#BB8FCE'
    };
    return colors[category] || '#95a5a6';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Loading expenses...</div>;
  }

  if (expenses.length === 0) {
    return <div className="no-expenses">No expenses found. Add your first expense!</div>;
  }

  return (
    <div className="expense-list-container">
      <h2>Your Expenses</h2>
      <div className="expense-list">
        {expenses.map(expense => (
          <div key={expense._id} className="expense-item">
            <div className="expense-header">
              <div className="expense-title-section">
                <span
                  className="category-badge"
                  style={{ backgroundColor: getCategoryColor(expense.category) }}
                >
                  {expense.category}
                </span>
                <h3 className="expense-title">{expense.title}</h3>
              </div>
              <button
                className="delete-btn"
                onClick={() => onDeleteExpense(expense._id)}
                title="Delete expense"
              >
                ✕
              </button>
            </div>

            <p className="expense-description">{expense.description}</p>

            <div className="expense-footer">
              <span className="expense-date">{formatDate(expense.date)}</span>
              <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
