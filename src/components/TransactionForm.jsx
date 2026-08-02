import { useState } from 'react'

const today = new Date()
const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
  today.getDate(),
).padStart(2, '0')}`

const initialFormData = {
  description: '',
  amount: '',
  type: 'expense',
  category: 'Food',
  date: localDate,
}

const categories = ['Food', 'Housing', 'Transportation', 'Entertainment', 'Income', 'Other']

function TransactionForm({ descriptionInputRef, onAddTransaction }) {
  const [formData, setFormData] = useState(initialFormData)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
    setError('')
  }

  function handleTypeChange(event) {
    const type = event.target.value

    setFormData((currentFormData) => ({
      ...currentFormData,
      type,
      category: type === 'income' ? 'Income' : 'Food',
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
    })
    setFormData(initialFormData)
    setError('')
    descriptionInputRef.current?.focus()
  }

  return (
    <section className="transaction-form" aria-labelledby="form-heading">
      <div className="section-heading">
        <h2 id="form-heading">Add a transaction</h2>
        <p>Record income or an expense.</p>
      </div>
      <form className="transaction-entry-form" onSubmit={handleSubmit}>
        <div className="form-field full-width-field">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            placeholder="e.g. Coffee"
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
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleTypeChange}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
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

        <button type="submit">Save transaction</button>
      </form>
    </section>
  )
}

export default TransactionForm
