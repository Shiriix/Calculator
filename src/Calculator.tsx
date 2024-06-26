import { useMemo, useState } from "react";
import Buttons from "./components/Buttons";
import Input from "./components/Input";
import { Operators } from "./types/operations";

const Calculator = () => {
  const [input, setInput] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const [oldInput, setOldInput] = useState<string | null>(null);
  const [showOldInput, setShowOldInput] = useState<boolean>(false);
  const [prevSymbol, setPrevSymbol] = useState<string | null>(null);
  const [equalSignPressed, setEqualSignPressed] = useState<boolean>(false);

  const currentInput: string | null = useMemo<string | null>(
    () => (showOldInput ? oldInput : input),
    [input, showOldInput]
  );

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

  const clear = () => {
    setInput(null);
    setOldInput(null);
    setShowOldInput(false);
    setTotal(0);
    setPrevSymbol(null);
    setHasError(false);
  };

  const prepareNextOperation = (symbol: string) => {
    setPrevSymbol(symbol);
    setShowOldInput(true);
    setOldInput(input);
    setInput(null);
  };

  const handleButtonPress = (value: string): void => {
    if (showOldInput) {
      setShowOldInput(false);
    }
    const numValue: number = parseInt(value);
    if (Number.isNaN(numValue)) {
      handleSymbol(value);
    } else {
      storeNumtoScreen(value);
      if (equalSignPressed) {
        setTotal(0);
      }
    }
    if (value !== "=") {
      setEqualSignPressed(
        (value === "+/-" && equalSignPressed) ||
          value === "%" ||
          (value === "." && equalSignPressed)
      );
    }
  };

  const handleSymbol = (symbol: string) => {
    switch (symbol) {
      case "C":
        clear();
        break;
      case "=":
        // when equal is pressed
        break;
      case "%":
      case "+/-":
        //handle logic for performing negative/positive or percentage conversion
        break;
      case ".":
        if (!input?.includes(".")) {
          storeNumtoScreen(symbol);
        }
        break;
      case "+":
      case "-":
      case "✕":
      case "÷":
        if (input === null || prevSymbol === null) {
          if (prevSymbol === null && input !== null) {
            setTotal(parseFloat(input));
          }
          prepareNextOperation(symbol);
          return;
        }

        const newTotal: number = calculate(
          parseFloat(input),
          total,
          prevSymbol
        );
        setTotal(newTotal);
        prepareNextOperation(symbol);

        break;
      default:
        break;
    }
  };

  const storeNumtoScreen = (num: string) => {
    setInput((prev) =>
      prev === "0" ||
      prev === null ||
      (equalSignPressed && input?.charAt(0) !== ".")
        ? num
        : prev + num
    );
  };

  return (
    <div className="calculator__container">
      <Input error={hasError} input={currentInput ?? "0"} />
      <Buttons handleOnPress={handleButtonPress} />
    </div>
  );
};

export default Calculator;
