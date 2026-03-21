import styles from "./keyboard.module.css";

interface KeyboardProps {
  onKeyPress: (value: number) => void;
  amount: number;
}

const Numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export const Keyboard = ({ onKeyPress, amount }: KeyboardProps) => {
  return (
    <div className={styles.keyboard}>
      <div
        className={styles["keyboard__display"]}
        aria-label={`Current amount`}
      >
        <p className={styles["keyboard__amount"]}>{amount}</p>
      </div>
      {Numbers.map((n) => (
        <button
          key={n}
          className={`${styles["keyboard__key"]}${n === 0 ? ` ${styles["keyboard__key--zero"]}` : ""}`}
          onClick={() => onKeyPress(n)}
          aria-label={`Enter digit ${n}`}
        >
          {n}
        </button>
      ))}
    </div>
  );
};
