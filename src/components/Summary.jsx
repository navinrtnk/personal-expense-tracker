const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function Summary({ transactions }) {
  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0)
  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0)
  const balance = income - expenses

  return (
    <section className="summary" aria-labelledby="balance-heading">
      <div className="balance-card">
        <p id="balance-heading">Current balance</p>
        <strong>{currencyFormatter.format(balance)}</strong>
        <p>Calculated from your recent income and expenses.</p>
      </div>
      <div className="summary-stat income-stat">
        <span>Income</span>
        <strong>{currencyFormatter.format(income)}</strong>
      </div>
      <div className="summary-stat expense-stat">
        <span>Expenses</span>
        <strong>{currencyFormatter.format(expenses)}</strong>
      </div>
    </section>
  )
}

export default Summary
