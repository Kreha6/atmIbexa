import { describe, expect, it, jest, beforeEach } from "@jest/globals";

import { renderHook, act } from "@testing-library/react";
import { useKeyboardWithActionButtons } from "./useKeyboardWithActionButtons";

const mockUpdateBalance = jest.fn();
let mockBalance = 0;

jest.mock("../../../state/useStore", () => ({
  useStore: (
    selector: (state: { balance: number; updateBalance: jest.Mock }) => unknown,
  ) => selector({ balance: mockBalance, updateBalance: mockUpdateBalance }),
}));

beforeEach(() => {
  mockBalance = 0;
  mockUpdateBalance.mockClear();
});

describe("useKeyboardWithActionButtons", () => {
  describe("initial state", () => {
    it("starts with newAmount of 0 and no error", () => {
      const { result } = renderHook(() => useKeyboardWithActionButtons());

      expect(result.current.newAmount).toBe(0);
      expect(result.current.error).toBeNull();
    });
  });

  describe("handleKeyPress", () => {
    it("Should handle a single digit press", () => {
      const { result } = renderHook(() => useKeyboardWithActionButtons());

      act(() => result.current.handleKeyPress(5));

      expect(result.current.newAmount).toBe(5);
    });
    it("Should handle multiple digits", () => {
      const { result } = renderHook(() => useKeyboardWithActionButtons());

      act(() => result.current.handleKeyPress(1));
      act(() => result.current.handleKeyPress(2));
      act(() => result.current.handleKeyPress(3));

      expect(result.current.newAmount).toBe(123);
    });
  });

  describe("clearAmount", () => {
    it("Should reset newAmount to 0", () => {
      const { result } = renderHook(() => useKeyboardWithActionButtons());

      act(() => result.current.handleKeyPress(9));
      act(() => result.current.clearAmount());

      expect(result.current.newAmount).toBe(0);
    });

    it("Should clear an existing error", () => {
      mockBalance = 0;
      const { result } = renderHook(() => useKeyboardWithActionButtons());

      act(() => result.current.handleKeyPress(5));
      act(() => result.current.handleWithdraw());
      expect(result.current.error).toBe("Insufficient funds");

      act(() => result.current.clearAmount());
      expect(result.current.error).toBeNull();
    });
  });

  describe("handleDeposit", () => {
    it("Should call updateBalance with the current amount", () => {
      const { result } = renderHook(() => useKeyboardWithActionButtons());

      act(() => result.current.handleKeyPress(2));
      act(() => result.current.handleKeyPress(5));
      act(() => result.current.handleDeposit());

      expect(mockUpdateBalance).toHaveBeenCalledTimes(1);
      expect(mockUpdateBalance).toHaveBeenCalledWith(25);
    });

    it("Should reset newAmount to 0 after deposit", () => {
      const { result } = renderHook(() => useKeyboardWithActionButtons());

      act(() => result.current.handleKeyPress(3));
      act(() => result.current.handleDeposit());

      expect(result.current.newAmount).toBe(0);
    });

    it("Should clear any existing error on deposit", () => {
      mockBalance = 0;
      const { result } = renderHook(() => useKeyboardWithActionButtons());

      act(() => result.current.handleKeyPress(5));
      act(() => result.current.handleWithdraw());
      expect(result.current.error).toBe("Insufficient funds");

      act(() => result.current.handleDeposit());
      expect(result.current.error).toBeNull();
    });
  });

  describe("handleWithdraw", () => {
    it("Should call updateBalance with negative amount when funds are sufficient", () => {
      mockBalance = 500;
      const { result } = renderHook(() => useKeyboardWithActionButtons());

      act(() => result.current.handleKeyPress(1));
      act(() => result.current.handleKeyPress(0));
      act(() => result.current.handleWithdraw());

      expect(mockUpdateBalance).toHaveBeenCalledTimes(1);
      expect(mockUpdateBalance).toHaveBeenCalledWith(-10);
    });

    it("Should reset newAmount to 0 after successful withdrawal", () => {
      const { result } = renderHook(() => useKeyboardWithActionButtons());
      mockBalance = 500;
      act(() => result.current.handleKeyPress(5));
      act(() => result.current.handleWithdraw());

      expect(result.current.newAmount).toBe(0);
    });

    it("Should set error when balance would go negative", () => {
      mockBalance = 10;
      const { result } = renderHook(() => useKeyboardWithActionButtons());

      act(() => result.current.handleKeyPress(5));
      act(() => result.current.handleKeyPress(0));
      act(() => result.current.handleWithdraw());

      expect(result.current.error).toBe("Insufficient funds");
      expect(mockUpdateBalance).not.toHaveBeenCalled();
    });

    it("Should not reset newAmount when withdrawal fails", () => {
      mockBalance = 10;
      const { result } = renderHook(() => useKeyboardWithActionButtons());

      act(() => result.current.handleKeyPress(5));
      act(() => result.current.handleKeyPress(0));
      act(() => result.current.handleWithdraw());

      expect(result.current.newAmount).toBe(50);
    });

    it("Should allow withdrawal when newAmount equals balance", () => {
      mockBalance = 100;
      const { result } = renderHook(() => useKeyboardWithActionButtons());

      act(() => result.current.handleKeyPress(1));
      act(() => result.current.handleKeyPress(0));
      act(() => result.current.handleKeyPress(0));

      act(() => result.current.handleWithdraw());

      expect(result.current.error).toBeNull();
      expect(mockUpdateBalance).toHaveBeenCalledWith(-100);
    });
  });
});
