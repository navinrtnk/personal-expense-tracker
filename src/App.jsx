import { useRef, useState } from 'react'
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
  const descriptionInputRef = useRef(null)

  function handleAddTransaction(transaction) {
    setTransactions((currentTransactions) => [
      { ...transaction, id: crypto.randomUUID() },
      ...currentTransactions,
    ])
  }

  function focusTransactionForm() {
    descriptionInputRef.current?.focus()
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Personal finance</p>
          <h1>Expense Tracker</h1>
        </div>
        <button
          className="primary-button"
          type="button"
          onClick={focusTransactionForm}
        >
          Add transaction
        </button>
      </header>

      <main>
        <Summary transactions={transactions} />
        <div className="content-grid">
          <TransactionForm
            descriptionInputRef={descriptionInputRef}
            onAddTransaction={handleAddTransaction}
          />
          <TransactionList transactions={transactions} />
        </div>
      </main>
    </div>
  )
}

export default App
