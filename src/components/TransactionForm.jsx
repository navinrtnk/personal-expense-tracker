import { useEffect, useRef, useState } from 'react'

const today = new Date()
const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
  today.getDate(),
).padStart(2, '0')}`

const expenseCategories = ['Food', 'Housing', 'Transportation', 'Entertainment', 'Other']

function TransactionForm({ transactionType, onAddTransaction, onClose }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: transactionType === 'income' ? 'Income' : 'Food',
    date: localDate,
  })
  const [error, setError] = useState('')
  const descriptionInputRef = useRef(null)
  const isIncome = transactionType === 'income'
  const formTitle = isIncome ? 'Add Income' : 'Add Expense'

  useEffect(() => {
    descriptionInputRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    const description = formData.description.trim()
    const amount = Number(formData.amount)

    if (!description || !Number.isFinite(amount) || amount <= 0) {
      setError('Enter a description and an amount greater than zero.')
      return
    }

    onAddTransaction({
      ...formData,
      description,
      amount,
      type: transactionType,
    })
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="transaction-modal"
        role="dialog"
        aria-labelledby="modal-heading"
        aria-modal="true"
      >
        <div className="modal-heading">
          <div>
            <p className={isIncome ? 'income-label' : 'expense-label'}>
              {isIncome ? 'Income' : 'Expense'}
            </p>
            <h2 id="modal-heading">{formTitle}</h2>
          </div>
          <button className="close-button" type="button" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="transaction-entry-form" onSubmit={handleSubmit}>
          <div className="form-field full-width-field">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              placeholder={isIncome ? 'e.g. Paycheck' : 'e.g. Coffee'}
              ref={descriptionInputRef}
              type="text"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              min="0.01"
              name="amount"
              placeholder="0.00"
              step="0.01"
              type="number"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              disabled={isIncome}
              value={formData.category}
              onChange={handleChange}
            >
              {(isIncome ? ['Income'] : expenseCategories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field full-width-field">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="modal-actions">
            <button className="cancel-button" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className={isIncome ? 'save-income-button' : ''} type="submit">
              {formTitle}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default TransactionForm
