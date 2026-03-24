import { memo } from "react";
import styles from "./actionButtons.module.css";
import { Button, ButtonVariant } from "../../common/Button";

interface ControlsProps {
  onWithdraw: () => void;
  onDeposit: () => void;
  onClear: () => void;
  error: string | null;
  disableClearButton: boolean;
}

export const ActionButtons = memo(
  ({
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
          <Button
            variant={ButtonVariant.Error}
            onClick={onWithdraw}
            ariaLabel="Withdraw amount"
            text="Withdraw"
          />
          <Button
            variant={ButtonVariant.Success}
            onClick={onDeposit}
            ariaLabel="Deposit amount"
            text="Deposit"
          />
          <Button
            variant={ButtonVariant.Warning}
            onClick={onClear}
            ariaLabel="Clear amount"
            text="Clear"
            disabled={disableClearButton}
          />
        </div>
      </div>
    );
  },
);
