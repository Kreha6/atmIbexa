import { useKeyboardWithActionButtons } from "./hooks/useKeyboardWithActionButtons";
import { ActionButtons } from "./ActionButtons";
import { Keyboard } from "./Keyboard";
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
      <Keyboard onKeyPress={handleKeyPress} amount={newAmount} />
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
