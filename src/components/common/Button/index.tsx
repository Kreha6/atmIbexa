import { memo } from "react";
import styles from "./button.module.css";

export const ButtonVariant = {
  Success: "success",
  Error: "error",
  Warning: "warning",
} as const;

type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

interface ButtonProps {
  ariaLabel: string;
  onClick: () => void;
  text: string;
  variant: ButtonVariant;
  disabled?: boolean;
}

export const Button = memo(({ ariaLabel, onClick, text, variant, disabled }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[`button--${variant}`]}`}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {text}
    </button>
  );
});
