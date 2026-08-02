# Personal Expense Tracker

A simple, responsive personal expense tracker built with React and Vite. The
project is designed to demonstrate core React concepts while growing into a
useful tool for recording transactions and monitoring spending.

## Working demo

The app starts with sample transaction data and provides separate actions for
adding income and expenses. Each action opens a focused modal form with the
transaction type already selected. New entries immediately update the summary
totals, item count, and recent-transactions list.

## Current features

- Reusable summary, form, list, and transaction-item components
- Separate Add Income and Add Expense actions
- Modal forms with type-specific headings and no redundant type dropdown
- Income category locked to Income and expense-only category choices
- Controlled inputs for description, amount, category, and date
- Add income and expense transactions to React state
- Basic validation for descriptions and positive amounts
- Escape, Cancel, and Close controls for dismissing the modal
- Automatic form focus when a modal opens
- Stable generated transaction IDs used as React keys
- Derived balance, income, and expense totals
- Responsive application layout
- Accessible headings, regions, focus styles, and controls

## Planned features

- Edit and delete transactions
- Filter transactions by type and category
- Save transactions with local storage

## Built with

- React
- Vite
- CSS
- Oxlint

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Available scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run lint     # Check the source with Oxlint
npm run preview  # Preview the production build
```
