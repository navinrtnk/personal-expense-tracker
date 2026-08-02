import TransactionItem from './TransactionItem'

function TransactionList({ transactions, onDeleteRequest }) {
  return (
    <section className="transactions" aria-labelledby="transactions-heading">
      <div className="section-heading transaction-list-heading">
        <div>
          <h2 id="transactions-heading">Recent transactions</h2>
          <p>Your latest financial activity.</p>
        </div>
        <span className="transaction-count">
          {transactions.length} {transactions.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDeleteRequest={onDeleteRequest}
          />
        ))}
      </ul>
    </section>
  )
}

export default TransactionList
