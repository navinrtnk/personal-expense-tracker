import { useState } from 'react'
import './App.css'
import DeleteConfirmation from './components/DeleteConfirmation'
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
  const [transactionToEdit, setTransactionToEdit] = useState(null)
  const [transactionToDelete, setTransactionToDelete] = useState(null)

  function handleAddTransaction(transaction) {
    setTransactions((currentTransactions) => [
      { ...transaction, id: crypto.randomUUID() },
      ...currentTransactions,
    ])
    setActiveFormType(null)
  }

  function handleDeleteTransaction() {
    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) => transaction.id !== transactionToDelete.id,
      ),
    )
    setTransactionToDelete(null)
  }

  function handleUpdateTransaction(updatedTransaction) {
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === transactionToEdit.id
          ? { ...updatedTransaction, id: transaction.id }
          : transaction,
      ),
    )
    setTransactionToEdit(null)
  }

  function closeTransactionForm() {
    setActiveFormType(null)
    setTransactionToEdit(null)
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
          <TransactionList
            transactions={transactions}
            onDeleteRequest={setTransactionToDelete}
            onEditRequest={setTransactionToEdit}
          />
        </div>
      </main>

      {(activeFormType || transactionToEdit) && (
        <TransactionForm
          transaction={transactionToEdit}
          transactionType={transactionToEdit?.type ?? activeFormType}
          onSubmitTransaction={
            transactionToEdit ? handleUpdateTransaction : handleAddTransaction
          }
          onClose={closeTransactionForm}
        />
      )}

      {transactionToDelete && (
        <DeleteConfirmation
          transaction={transactionToDelete}
          onCancel={() => setTransactionToDelete(null)}
          onConfirm={handleDeleteTransaction}
        />
      )}
    </div>
  )
}

export default App
