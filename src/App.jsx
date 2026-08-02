import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Personal finance</p>
          <h1>Expense Tracker</h1>
        </div>
        <button className="primary-button" type="button">
          Add transaction
        </button>
      </header>

      <main>
        <section className="summary-card" aria-labelledby="balance-heading">
          <p id="balance-heading">Current balance</p>
          <strong>$0.00</strong>
          <p>Add your first transaction to start tracking your spending.</p>
        </section>

        <section className="transactions" aria-labelledby="transactions-heading">
          <div>
            <h2 id="transactions-heading">Recent transactions</h2>
            <p>Your income and expenses will appear here.</p>
          </div>
          <div className="empty-state">
            <span aria-hidden="true">$</span>
            <h3>No transactions yet</h3>
            <p>Add a transaction to see your financial activity.</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
