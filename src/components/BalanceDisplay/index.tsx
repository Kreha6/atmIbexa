import { useStore } from "../../state/useStore";
import styles from "./index.module.css";

export const BalanceDisplay = () => {
  const balance = useStore((state) => state.balance);

  return (
    <div
      className={styles["balance-display"]}
      role="status"
      aria-label={`Account balance`}
    >
      <p className={styles["balance-display__text"]}>Balance: {balance.toString()}</p>
    </div>
  );
};
