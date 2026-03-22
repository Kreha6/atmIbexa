import { useKeyboardWithActionButtons } from "./hooks/useKeyboardWithActionButtons";
import { ActionButtons } from "./ActionButtons";
import { Keyboard } from "./Keyboard";
import { formatAmount } from "../../utils/formatAmount";
import styles from "./index.module.css";

export const Controls = () => {
  const {
    handleDeposit,
    handleWithdraw,
    handleKeyPress,
    newAmount,
    clearAmount,
    error,
  } = useKeyboardWithActionButtons();

  return (
    <div className={styles.controls}>
      <Keyboard onKeyPress={handleKeyPress} amount={formatAmount(newAmount)} />
      <ActionButtons
        onDeposit={handleDeposit}
        onWithdraw={handleWithdraw}
        onClear={clearAmount}
        newAmount={newAmount}
        error={error}
      />
    </div>
  );
};
