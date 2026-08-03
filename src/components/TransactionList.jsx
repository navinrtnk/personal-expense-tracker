import TransactionItem from './TransactionItem'

function TransactionList({
  transactions,
  totalTransactionCount,
  filters,
  filterBar,
  onClearFilters,
  onDeleteRequest,
  onEditRequest,
}) {
  const hasActiveFilters = filters.type !== 'all' || filters.category !== 'all'
  const itemLabel = transactions.length === 1 ? 'item' : 'items'

  return (
    <section className="transactions" aria-labelledby="transactions-heading">
      <div className="section-heading transaction-list-heading">
        <div>
          <h2 id="transactions-heading">Recent transactions</h2>
          <p>Your latest financial activity.</p>
        </div>
        <span className="transaction-count">
          {hasActiveFilters
            ? `${transactions.length} of ${totalTransactionCount} items`
            : `${transactions.length} ${itemLabel}`}
        </span>
      </div>
      {filterBar}
      {transactions.length > 0 ? (
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDeleteRequest={onDeleteRequest}
              onEditRequest={onEditRequest}
            />
          ))}
        </ul>
      ) : (
        <div className="filtered-empty-state">
          <span aria-hidden="true">⌕</span>
          <h3>{totalTransactionCount > 0 ? 'No matching transactions' : 'No transactions yet'}</h3>
          <p>
            {totalTransactionCount > 0
              ? 'No transactions match the selected filters.'
              : 'Add income or an expense to get started.'}
          </p>
          {totalTransactionCount > 0 && (
            <button
              type="button"
              aria-label="Clear transaction filters"
              onClick={onClearFilters}
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </section>
  )
}

export default TransactionList
