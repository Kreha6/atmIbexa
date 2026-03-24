import { useStore } from "../../state/useStore";
import { formatAmount } from "../../utils/formatAmount";
import styles from "./index.module.css";

export const BalanceDisplay = () => {
  const balance = useStore((state) => state.balance);

  return (
    <section
      className={styles["balance-display"]}
      role="status"
      aria-label={`Account balance`}
    >
      <p className={styles["balance-display__text"]}>
        Balance: {formatAmount(balance)}
      </p>
    </section>
  );
};
