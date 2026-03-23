import { useCallback, useState } from "react";
import Big from "big.js";
import { useStore } from "../../../state/useStore";

export function useKeyboardWithActionButtons() {
  const [newAmount, setNewAmount] = useState(new Big(0));
  const [error, setError] = useState<string | null>(null);

  const updateBalance = useStore((state) => state.updateBalance);
  const balance = useStore((state) => state.balance);

  const clearAmount = useCallback(() => {
    setError(null);
    setNewAmount(new Big(0));
  }, []);

  const handleKeyPress = useCallback((digit: number) => {
    setNewAmount((prev) => prev.times(10).plus(digit));
  }, []);

  const handleDeposit = () => {
    setError(null);
    updateBalance(newAmount);
    clearAmount();
  };

  const handleWithdraw = () => {
    if (balance.minus(newAmount).lt(0)) {
      setError("Insufficient funds");
      return;
    }
    setError(null);
    updateBalance(newAmount.times(-1));
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
