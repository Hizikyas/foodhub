import { useReducer } from "react";

const intialState = { enteredValue: "", isTouched: false };

const reducerFunction = (state, action) => {
  if (action.type === "value")
    return { enteredValue: action.value, isTouched: true };

  if (action.type === "blur")
    return { enteredValue: state.enteredValue, isTouched: true };

  if (action.type === "reset") {
    return intialState;
  }

  return intialState;
};

const useInput = (validateValue) => {
  const [state, dispacth] = useReducer(reducerFunction, intialState);

  const enteredValid = validateValue(state.enteredValue);
  const inValid = !enteredValid && state.isTouched;

  const inputHundler = (event) => {
    event.preventDefault();
    dispacth({ type: "value", value: event.target.value });
  };

  const inputBlurHundler = () => {
    dispacth({ type: "blur" });
  };

  const reset = () => {
    dispacth({ type: "reset" });
  };

  return {
    inputHundler,
    inputBlurHundler,
    enteredValue: state.enteredValue,
    enteredValid,
    inValid,
    reset,
  };
};
export default useInput;
