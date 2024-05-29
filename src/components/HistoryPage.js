import React, { useState } from 'react';
import './TransactionHistory.css';

const transactions = [
  { type: 'sold', description: 'AMAZON (25-49)', date: '22-03-2024', amount: '-₦25,200.00' },
  { type: 'bought', description: 'NIGE AMAZON (25-49)', date: '22-03-2024', amount: '-₦25,200.00' },
  { type: 'sold', description: 'USA AMAZON (25-49)', date: '22-03-2024', amount: '-₦25,200.00' },
  { type: 'bought', description: 'NIGE AMAZON (25-49)', date: '22-03-2024', amount: '-₦25,200.00' },
];

const TransactionHistory = () => {
  const [filter, setFilter] = useState('sold');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="transaction-history">
      <h1>Transaction History</h1>
      <div className="filter-buttons">
        <button className={filter === 'sold' ? 'active' : ''} onClick={() => handleFilterChange('sold')}>
          Sold
        </button>
        <button className={filter === 'bought' ? 'active' : ''} onClick={() => handleFilterChange('bought')}>
          Bought
        </button>
      </div>
      <div className="transactions">
        {transactions.filter(transaction => transaction.type === filter).map((transaction, index) => (
          <div className="transaction-item" key={index}>
            <div className="description">{transaction.description}</div>
            <div className="date">{transaction.date}</div>
            <div className="amount">{transaction.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
