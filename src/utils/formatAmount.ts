import Big from "big.js";

export function formatAmount(amount: Big): string {
  return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}
