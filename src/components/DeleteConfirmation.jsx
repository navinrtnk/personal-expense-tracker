import { useEffect, useRef } from 'react'

function DeleteConfirmation({ transaction, onCancel, onConfirm }) {
  const confirmButtonRef = useRef(null)

  useEffect(() => {
    confirmButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="delete-confirmation"
        role="dialog"
        aria-labelledby="delete-heading"
        aria-describedby="delete-description"
        aria-modal="true"
      >
        <div className="delete-dialog-icon" aria-hidden="true">
          !
        </div>
        <h2 id="delete-heading">Delete transaction?</h2>
        <p id="delete-description">
          Are you sure you want to delete <strong>{transaction.description}</strong>? This
          action cannot be undone.
        </p>
        <div className="delete-dialog-actions">
          <button className="cancel-button" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="confirm-delete-button"
            type="button"
            ref={confirmButtonRef}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </section>
    </div>
  )
}

export default DeleteConfirmation
