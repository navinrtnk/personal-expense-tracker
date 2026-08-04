export const TRANSACTIONS_STORAGE_KEY = 'personal-expense-tracker-transactions'

function isValidTransaction(transaction) {
  return (
    transaction !== null &&
    typeof transaction === 'object' &&
    typeof transaction.id === 'string' &&
    typeof transaction.description === 'string' &&
    typeof transaction.amount === 'number' &&
    Number.isFinite(transaction.amount) &&
    (transaction.type === 'income' || transaction.type === 'expense') &&
    typeof transaction.category === 'string' &&
    typeof transaction.date === 'string'
  )
}

export function loadTransactions(fallbackTransactions) {
  try {
    const storedTransactions = localStorage.getItem(TRANSACTIONS_STORAGE_KEY)

    if (storedTransactions === null) {
      return fallbackTransactions
    }

    const parsedTransactions = JSON.parse(storedTransactions)

    return Array.isArray(parsedTransactions) &&
      parsedTransactions.every(isValidTransaction)
      ? parsedTransactions
      : fallbackTransactions
  } catch {
    return fallbackTransactions
  }
}

export function saveTransactions(transactions) {
  try {
    localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions))
  } catch {
    // The app remains usable when storage is unavailable or full.
  }
}
