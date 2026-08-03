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

function TransactionItem({ transaction, onDeleteRequest, onEditRequest }) {
  const isIncome = transaction.type === 'income'
  const amountPrefix = isIncome ? '+' : '-'

  return (
    <li className="transaction-item">
      <button
        className="edit-row-button"
        type="button"
        aria-label={`Edit ${transaction.description}`}
        onClick={() => onEditRequest(transaction)}
      />
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
      <button
        className="delete-button"
        type="button"
        aria-label={`Delete ${transaction.description}`}
        title={`Delete ${transaction.description}`}
        onClick={() => onDeleteRequest(transaction)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-2 6h10l-.7 11H7.7L7 9Zm3 2v7h2v-7h-2Zm4 0v7h2v-7h-2Z" />
        </svg>
      </button>
    </li>
  )
}

export default TransactionItem
