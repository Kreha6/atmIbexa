import { memo } from "react";
import styles from "./actionButtons.module.css";

interface ControlsProps {
  onWithdraw: () => void;
  onDeposit: () => void;
  onClear: () => void;
  error: string | null;
  disableClearButton: boolean;
}

export const ActionButtons = memo(({
  onWithdraw,
  onDeposit,
  onClear,
  error,
  disableClearButton,
}: ControlsProps) => {
  return (
    <div className={styles["action-buttons"]}>
      {error && (
        <p
          className={styles["action-buttons__error"]}
          role="alert"
          aria-live="assertive"
        >
          {error}
        </p>
      )}
      <div className={styles["action-buttons__group"]}>
        <button
          className={`${styles["action-buttons__button"]} ${styles["action-buttons__button--withdraw"]}`}
          onClick={onWithdraw}
          aria-label="Withdraw amount"
        >
          Withdraw
        </button>
        <button
          className={`${styles["action-buttons__button"]} ${styles["action-buttons__button--deposit"]}`}
          onClick={onDeposit}
          aria-label="Deposit amount"
        >
          Deposit
        </button>

        <button
          disabled={disableClearButton}
          className={`${styles["action-buttons__button"]} ${styles["action-buttons__button--clear"]}`}
          onClick={onClear}
          aria-label="Clear amount"
        >
          Clear
        </button>
      </div>
    </div>
  );
});
