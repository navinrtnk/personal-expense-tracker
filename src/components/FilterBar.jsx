const expenseCategories = ['Food', 'Housing', 'Transportation', 'Entertainment', 'Other']

function FilterBar({ filters, onTypeChange, onCategoryChange, onClear }) {
  const categoryOptions =
    filters.type === 'income'
      ? ['Income']
      : filters.type === 'expense'
        ? expenseCategories
        : ['Income', ...expenseCategories]
  const hasActiveFilters = filters.type !== 'all' || filters.category !== 'all'

  return (
    <div className="filter-bar" aria-label="Transaction filters">
      <div className="filter-field">
        <label htmlFor="filter-type">Type</label>
        <select
          id="filter-type"
          value={filters.type}
          onChange={(event) => onTypeChange(event.target.value)}
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="filter-category">Category</label>
        <select
          id="filter-category"
          value={filters.category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="all">All categories</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button type="button" className="clear-filters-button" disabled={!hasActiveFilters} onClick={onClear}>
        Clear filters
      </button>
    </div>
  )
}

export default FilterBar
