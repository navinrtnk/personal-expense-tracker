import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

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
    await user.click(within(dialog).getByRole('button', { name: 'Add Expense' }))

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
    await user.click(within(dialog).getByRole('button', { name: 'Add Income' }))

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
    await user.click(within(dialog).getByRole('button', { name: 'Add Expense' }))

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
