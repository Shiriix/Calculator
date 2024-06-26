import { useMemo, useState } from "react";
import Buttons from "./components/Buttons/Buttons";
import Input from "./components/Input/Input";

import "./styles.scss";
import calculate from "./utils/calculate";

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
        setEqualSignPressed(true);
        if (input === null || prevSymbol === null) return;
        const finalTotal: number = calculate(
          parseFloat(input),
          total,
          prevSymbol
        );
        if (input === "0" && prevSymbol === "÷") {
          setHasError(true);
          return;
        }
        setInput(finalTotal.toString());
        setPrevSymbol(null);
        if (showOldInput) setShowOldInput(false);
        break;
      case "%":
      case "+/-":
        if (input === null) {
          return;
        }
        const changedValue: number = calculate(
          parseFloat(input),
          total,
          symbol
        );
        setInput(changedValue.toString());
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
