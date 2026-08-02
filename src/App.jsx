import { useState } from 'react'
import './App.css'
import Summary from './components/Summary'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'

const sampleTransactions = [
  {
    id: 'transaction-1',
    description: 'Monthly paycheck',
    amount: 3200,
    type: 'income',
    category: 'Income',
    date: '2026-07-31',
  },
  {
    id: 'transaction-2',
    description: 'Apartment rent',
    amount: 1250,
    type: 'expense',
    category: 'Housing',
    date: '2026-07-30',
  },
  {
    id: 'transaction-3',
    description: 'Grocery run',
    amount: 86.42,
    type: 'expense',
    category: 'Food',
    date: '2026-07-28',
  },
  {
    id: 'transaction-4',
    description: 'Freelance project',
    amount: 450,
    type: 'income',
    category: 'Income',
    date: '2026-07-25',
  },
]

function App() {
  const [transactions, setTransactions] = useState(sampleTransactions)
  const [activeFormType, setActiveFormType] = useState(null)

  function handleAddTransaction(transaction) {
    setTransactions((currentTransactions) => [
      { ...transaction, id: crypto.randomUUID() },
      ...currentTransactions,
    ])
    setActiveFormType(null)
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Personal finance</p>
          <h1>Expense Tracker</h1>
        </div>
      </header>

      <main>
        <Summary transactions={transactions} />
        <div className="content-grid">
          <section className="transaction-actions" aria-labelledby="actions-heading">
            <div className="section-heading">
              <h2 id="actions-heading">New entry</h2>
              <p>What would you like to record?</p>
            </div>
            <div className="action-buttons">
              <button
                className="income-button"
                type="button"
                onClick={() => setActiveFormType('income')}
              >
                <span aria-hidden="true">+</span>
                Add Income
              </button>
              <button
                className="expense-button"
                type="button"
                onClick={() => setActiveFormType('expense')}
              >
                <span aria-hidden="true">−</span>
                Add Expense
              </button>
            </div>
          </section>
          <TransactionList transactions={transactions} />
        </div>
      </main>

      {activeFormType && (
        <TransactionForm
          transactionType={activeFormType}
          onAddTransaction={handleAddTransaction}
          onClose={() => setActiveFormType(null)}
        />
      )}
    </div>
  )
}

export default App
