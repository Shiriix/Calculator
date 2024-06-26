interface IProps {
  handleOnPress: (value: string) => void;
}

const Buttons = ({ handleOnPress }: IProps) => {
  const onPress = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value: string = event.currentTarget.innerText;
    handleOnPress(value);
  };

  return (
    <div className="buttons__container">
      <div className="buttons__row">
        <button className="buttons__top" onClick={onPress}>
          C
        </button>
        <button className="buttons__top" onClick={onPress}>
          +/-
        </button>
        <button className="buttons__top" onClick={onPress}>
          %
        </button>
        <button className="buttons__last" onClick={onPress}>
          ÷
        </button>
      </div>

      <div className="buttons__row">
        <button onClick={onPress}>7</button>
        <button onClick={onPress}>8</button>
        <button onClick={onPress}>9</button>
        <button className="buttons__last" onClick={onPress}>
          X
        </button>
      </div>

      <div className="buttons__row">
        <button onClick={onPress}>4</button>
        <button onClick={onPress}>5</button>
        <button onClick={onPress}>6</button>
        <button className="buttons__last" onClick={onPress}>
          -
        </button>
      </div>

      <div className="buttons__row">
        <button onClick={onPress}>1</button>
        <button onClick={onPress}>2</button>
        <button onClick={onPress}>3</button>
        <button className="buttons__last" onClick={onPress}>
          +
        </button>
      </div>

      <div className="buttons__row">
        <button className="buttons__zero" onClick={onPress}>
          0
        </button>
        <button className="buttons__decimal" onClick={onPress}>
          .
        </button>
        <button className="buttons__last--equals" onClick={onPress}>
          =
        </button>
      </div>
    </div>
  );
};

export default Buttons;
