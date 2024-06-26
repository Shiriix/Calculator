interface IProps {
  input: string;
  error: boolean;
}

const Input = ({ input, error }: IProps) => {
  return (
    <div className="input__container">
      {error ? <h1>Error</h1> : <h1>{input ? input : "0"}</h1>}
    </div>
  );
};

export default Input;
