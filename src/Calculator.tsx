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
    X: (n1, n2) => n1 * n2,
    "÷": (n1, n2) => n1 / n2,
    "%": (_n1, n2) => n2 / 100,
    "+/-": (_n1, n2) => n2 * -1,
  };

  //   const calculate = (
  //     buffer: number,
  //     currentTotal: number,
  //     symbol: string
  //   ): number => {
  //     return operations[symbol](currentTotal, buffer);
  //   };

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
        // clear function
        break;
      case "=":
        // when equal is pressed
        break;
      case "%":
      case "+/-":
        //handle logic for performing negative/positive or percentage conversion
        break;
      case ".":
        // handle decimal
        break;
      case "+":
      case "-":
      case "✕":
      case "÷":
        // standard operations
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
