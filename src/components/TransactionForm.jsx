function TransactionForm() {
  return (
    <section className="transaction-form" aria-labelledby="form-heading">
      <div className="section-heading">
        <h2 id="form-heading">Add a transaction</h2>
        <p>Transaction entry is coming in the next step.</p>
      </div>
      <div className="form-preview" aria-hidden="true">
        <span>Description</span>
        <span>Amount</span>
        <span>Category</span>
        <button type="button" disabled>
          Save transaction
        </button>
      </div>
    </section>
  )
}

export default TransactionForm
