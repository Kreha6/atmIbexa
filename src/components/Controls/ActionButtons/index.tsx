import Big from "big.js";
import styles from "./actionButtons.module.css";

interface ControlsProps {
  onWithdraw: () => void;
  onDeposit: () => void;
  onClear: () => void;
  error: string | null;
  newAmount: Big;
}

export const ActionButtons = ({
  onWithdraw,
  onDeposit,
  onClear,
  error,
  newAmount,
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
          disabled={newAmount.lte(0)}
          className={`${styles["action-buttons__button"]} ${styles["action-buttons__button--clear"]}`}
          onClick={onClear}
          aria-label="Clear amount"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
