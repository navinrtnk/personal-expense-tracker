import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { TRANSACTIONS_STORAGE_KEY } from './utils/transactionStorage'

beforeEach(() => {
  localStorage.clear()
})

describe('initial expense tracker dashboard', () => {
  it('renders the sample transactions and calculated summary', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Expense Tracker' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add Income' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add Expense' })).toBeInTheDocument()
    expect(screen.getByText('4 items')).toBeInTheDocument()
    expect(screen.getByText('Monthly paycheck')).toBeInTheDocument()
    expect(screen.getByText('Apartment rent')).toBeInTheDocument()
    expect(screen.getByText('$2,313.58')).toBeInTheDocument()
    expect(screen.getByText('$3,650.00')).toBeInTheDocument()
    expect(screen.getByText('$1,336.42')).toBeInTheDocument()
  })

  it('keeps transaction forms closed until an action is selected', () => {
    render(<App />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

describe('adding transactions', () => {
  it('adds an expense and updates the list and summary', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Add Expense' }))

    const dialog = screen.getByRole('dialog', { name: 'Add Expense' })
    const category = within(dialog).getByLabelText('Category')

    expect(category).toBeEnabled()
    expect(within(category).queryByRole('option', { name: 'Income' })).not.toBeInTheDocument()

    await user.type(within(dialog).getByLabelText('Description'), 'Electric bill')
    await user.type(within(dialog).getByLabelText('Amount'), '124.50')
    await user.selectOptions(category, 'Housing')
    await user.click(within(dialog).getByRole('button', { name: 'Save' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByText('5 items')).toBeInTheDocument()
    expect(screen.getByText('Electric bill')).toBeInTheDocument()
    expect(screen.getByText('-$124.50')).toBeInTheDocument()
    expect(screen.getByText('$2,189.08')).toBeInTheDocument()
    expect(screen.getByText('$1,460.92')).toBeInTheDocument()
  })

  it('adds income with the Income category locked', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Add Income' }))

    const dialog = screen.getByRole('dialog', { name: 'Add Income' })
    const category = within(dialog).getByLabelText('Category')

    expect(category).toBeDisabled()
    expect(category).toHaveValue('Income')

    await user.type(within(dialog).getByLabelText('Description'), 'Bonus')
    await user.type(within(dialog).getByLabelText('Amount'), '500')
    await user.click(within(dialog).getByRole('button', { name: 'Save' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByText('Bonus')).toBeInTheDocument()
    expect(screen.getByText('+$500.00')).toBeInTheDocument()
    expect(screen.getByText('$2,813.58')).toBeInTheDocument()
    expect(screen.getByText('$4,150.00')).toBeInTheDocument()
  })

  it('shows a validation error for an incomplete transaction', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Add Expense' }))

    const dialog = screen.getByRole('dialog', { name: 'Add Expense' })
    await user.click(within(dialog).getByRole('button', { name: 'Save' }))

    expect(
      within(dialog).getByRole('alert'),
    ).toHaveTextContent('Enter a description and an amount greater than zero.')
    expect(screen.getByRole('dialog', { name: 'Add Expense' })).toBeInTheDocument()
    expect(screen.getByText('4 items')).toBeInTheDocument()
  })
})

describe('deleting transactions', () => {
  it('keeps a transaction when deletion is canceled', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Delete Apartment rent' }))

    const dialog = screen.getByRole('dialog', { name: 'Delete transaction?' })
    expect(within(dialog).getByText('Apartment rent')).toBeInTheDocument()
    expect(screen.queryByRole('dialog', { name: 'Edit Expense' })).not.toBeInTheDocument()

    await user.click(within(dialog).getByRole('button', { name: 'Cancel' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByText('Apartment rent')).toBeInTheDocument()
    expect(screen.getByText('4 items')).toBeInTheDocument()
  })

  it('deletes a transaction and recalculates the summary', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Delete Grocery run' }))

    const dialog = screen.getByRole('dialog', { name: 'Delete transaction?' })
    await user.click(within(dialog).getByRole('button', { name: 'Delete' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByText('Grocery run')).not.toBeInTheDocument()
    expect(screen.getByText('3 items')).toBeInTheDocument()
    expect(screen.getByText('$2,400.00')).toBeInTheDocument()
    expect(screen.getByText('$1,250.00')).toBeInTheDocument()
  })
})

describe('editing transactions', () => {
  it('edits a transaction and recalculates the summary', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Edit Grocery run' }))

    const dialog = screen.getByRole('dialog', { name: 'Edit Expense' })
    const description = within(dialog).getByLabelText('Description')
    const amount = within(dialog).getByLabelText('Amount')
    const category = within(dialog).getByLabelText('Category')

    expect(description).toHaveValue('Grocery run')
    expect(amount).toHaveValue(86.42)
    expect(category).toHaveValue('Food')

    await user.clear(description)
    await user.type(description, 'Weekly groceries')
    await user.clear(amount)
    await user.type(amount, '100')
    await user.selectOptions(category, 'Other')
    await user.click(within(dialog).getByRole('button', { name: 'Save' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByText('Grocery run')).not.toBeInTheDocument()
    expect(screen.getByText('Weekly groceries')).toBeInTheDocument()
    expect(screen.getByText('Other · Jul 28, 2026')).toBeInTheDocument()
    expect(screen.getByText('-$100.00')).toBeInTheDocument()
    expect(screen.getByText('4 items')).toBeInTheDocument()
    expect(screen.getByText('$2,300.00')).toBeInTheDocument()
    expect(screen.getByText('$1,350.00')).toBeInTheDocument()
  })
})

describe('filtering transactions', () => {
  it('filters the list by income without changing summary totals', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByLabelText('Type'), 'income')

    expect(screen.getByText('2 of 4 items')).toBeInTheDocument()
    expect(screen.getByText('Monthly paycheck')).toBeInTheDocument()
    expect(screen.getByText('Freelance project')).toBeInTheDocument()
    expect(screen.queryByText('Apartment rent')).not.toBeInTheDocument()
    expect(screen.queryByText('Grocery run')).not.toBeInTheDocument()
    expect(screen.getByText('$2,313.58')).toBeInTheDocument()
    expect(screen.getByText('$3,650.00')).toBeInTheDocument()
    expect(screen.getByText('$1,336.42')).toBeInTheDocument()
  })

  it('combines expense and category filters', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByLabelText('Type'), 'expense')
    await user.selectOptions(screen.getByLabelText('Category'), 'Housing')

    expect(screen.getByText('1 of 4 items')).toBeInTheDocument()
    expect(screen.getByText('Apartment rent')).toBeInTheDocument()
    expect(screen.queryByText('Grocery run')).not.toBeInTheDocument()
    expect(
      within(screen.getByLabelText('Category')).queryByRole('option', {
        name: 'Income',
      }),
    ).not.toBeInTheDocument()
  })

  it('resets an incompatible category when the type changes', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByLabelText('Category'), 'Food')
    await user.selectOptions(screen.getByLabelText('Type'), 'income')

    expect(screen.getByLabelText('Category')).toHaveValue('all')
    expect(screen.getByText('2 of 4 items')).toBeInTheDocument()
  })

  it('shows a no-results state and clears all filters', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByLabelText('Type'), 'expense')
    await user.selectOptions(screen.getByLabelText('Category'), 'Entertainment')

    expect(screen.getByText('0 of 4 items')).toBeInTheDocument()
    expect(screen.getByText('No matching transactions')).toBeInTheDocument()
    expect(
      screen.getByText('No transactions match the selected filters.'),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Clear transaction filters' }))

    expect(screen.getByLabelText('Type')).toHaveValue('all')
    expect(screen.getByLabelText('Category')).toHaveValue('all')
    expect(screen.getByText('4 items')).toBeInTheDocument()
    expect(screen.getByText('Grocery run')).toBeInTheDocument()
  })
})

describe('local storage persistence', () => {
  it('loads valid saved transactions instead of sample data', () => {
    localStorage.setItem(
      TRANSACTIONS_STORAGE_KEY,
      JSON.stringify([
        {
          id: 'saved-transaction',
          description: 'Saved payment',
          amount: 200,
          type: 'income',
          category: 'Income',
          date: '2026-08-03',
        },
      ]),
    )

    render(<App />)

    expect(screen.getByText('Saved payment')).toBeInTheDocument()
    expect(screen.getByText('1 item')).toBeInTheDocument()
    expect(screen.queryByText('Monthly paycheck')).not.toBeInTheDocument()
    expect(screen.getAllByText('$200.00')).toHaveLength(2)
  })

  it('preserves a deliberately empty saved transaction list', () => {
    localStorage.setItem(TRANSACTIONS_STORAGE_KEY, '[]')

    render(<App />)

    expect(screen.getByText('0 items')).toBeInTheDocument()
    expect(screen.getByText('No transactions yet')).toBeInTheDocument()
    expect(screen.queryByText('Monthly paycheck')).not.toBeInTheDocument()
  })

  it('falls back to sample data when saved data is malformed', () => {
    localStorage.setItem(TRANSACTIONS_STORAGE_KEY, '{not-valid-json')

    render(<App />)

    expect(screen.getByText('4 items')).toBeInTheDocument()
    expect(screen.getByText('Monthly paycheck')).toBeInTheDocument()
  })

  it('saves newly added transactions', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Add Income' }))
    const dialog = screen.getByRole('dialog', { name: 'Add Income' })
    await user.type(within(dialog).getByLabelText('Description'), 'Saved bonus')
    await user.type(within(dialog).getByLabelText('Amount'), '250')
    await user.click(within(dialog).getByRole('button', { name: 'Save' }))

    await waitFor(() => {
      const savedTransactions = JSON.parse(
        localStorage.getItem(TRANSACTIONS_STORAGE_KEY),
      )

      expect(savedTransactions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            description: 'Saved bonus',
            amount: 250,
            type: 'income',
            category: 'Income',
          }),
        ]),
      )
    })
  })
})
