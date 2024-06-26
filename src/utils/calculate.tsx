import { Operators } from "../types/operations";

const operations: Operators = {
  "+": (n1, n2) => n1 + n2,
  "-": (n1, n2) => n1 - n2,
  "✕": (n1, n2) => n1 * n2,
  "÷": (n1, n2) => n1 / n2,
  "%": (_n1, n2) => n2 / 100,
  "+/-": (_n1, n2) => n2 * -1,
};

const calculate = (
  buffer: number,
  currentTotal: number,
  symbol: string
): number => {
  return operations[symbol as keyof Operators](currentTotal, buffer);
};

export default calculate;
