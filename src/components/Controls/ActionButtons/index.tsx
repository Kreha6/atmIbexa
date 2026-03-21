import styles from './actionButtons.module.css'

interface ControlsProps {
  onWithdraw?: () => void
  onDeposit?: () => void
  onClear?: () => void
  error?: string | null
  newAmount?: number
}

export const ActionButtons = ({ onWithdraw, onDeposit, onClear, error, newAmount }: ControlsProps) => {
  return (
    <div className={styles.wrapper}>
      {error && <p className={styles.error} role="alert" aria-live="assertive">{error}</p>}
      <div className={styles.controls}>
        <button className={`${styles.button} ${styles.withdraw}`} onClick={onWithdraw} aria-label="Withdraw amount">
          Withdraw
        </button>
        <button className={`${styles.button} ${styles.deposit}`} onClick={onDeposit} aria-label="Deposit amount">
          Deposit
        </button>
        {newAmount! > 0 && (
          <button className={`${styles.button} ${styles.clear}`} onClick={onClear} aria-label="Clear amount">
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
