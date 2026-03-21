import { useState } from "react";
import { useStore } from "../../../state/useStore";

export function useKeyboardWithActionButtons() {
  const updateBalance = useStore((state) => state.updateBalance);
  const balance = useStore((state) => state.balance);
  const [newAmount, setNewAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const clearAmount = () => {
    setError(null);
    setNewAmount(0);
  };

  const handleKeyPress = (digit: number) => {
    setNewAmount((prev) => prev * 10 + digit);
  };

  const handleDeposit = () => {
    setError(null);
    updateBalance(newAmount);
    clearAmount();
  };

  const handleWithdraw = () => {
    if (balance - newAmount < 0) {
      setError("Insufficient funds");
      return;
    }
    setError(null);
    updateBalance(-newAmount);
    clearAmount();
  };

  return {
    handleDeposit,
    handleWithdraw,
    handleKeyPress,
    newAmount,
    clearAmount,
    error,
  };
}
