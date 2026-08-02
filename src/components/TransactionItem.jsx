const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

function TransactionItem({ transaction }) {
  const isIncome = transaction.type === 'income'
  const amountPrefix = isIncome ? '+' : '-'

  return (
    <li className="transaction-item">
      <span
        className={`transaction-icon ${isIncome ? 'income-icon' : 'expense-icon'}`}
        aria-hidden="true"
      >
        {isIncome ? '↗' : '↘'}
      </span>
      <div className="transaction-details">
        <strong>{transaction.description}</strong>
        <span>
          {transaction.category} · {dateFormatter.format(new Date(transaction.date))}
        </span>
      </div>
      <strong className={isIncome ? 'income-amount' : 'expense-amount'}>
        {amountPrefix}
        {currencyFormatter.format(transaction.amount)}
      </strong>
    </li>
  )
}

export default TransactionItem
