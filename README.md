# Personal Expense Tracker

A simple, responsive personal expense tracker built with React and Vite. The
project is designed to demonstrate core React concepts while growing into a
useful tool for recording transactions and monitoring spending.

## Working demo

The current version displays sample transaction data through a reusable React
component structure. The summary derives the balance, income, and expenses from
that data, while the transaction list renders an item for each record.

![Personal Expense Tracker desktop demo](docs/expense-tracker-demo.png)

## Current features

- Reusable summary, form, list, and transaction-item components
- Sample transactions passed through props
- Stable transaction IDs used as React keys
- Derived balance, income, and expense totals
- Form placeholder for the next implementation step
- Responsive application layout
- Accessible headings, regions, focus styles, and controls

## Planned features

- Add, edit, and delete transactions
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
