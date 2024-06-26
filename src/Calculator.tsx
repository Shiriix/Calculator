import { useMemo, useState } from "react";
import Buttons from "./components/Buttons";
import Input from "./components/Input";

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

  const handleSymbol = (symbol: string) => {};

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
