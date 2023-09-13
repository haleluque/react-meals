import { useState } from "react";

const useForm = (validation) => {
  const [inputValue, setInputValue] = useState("");
  const [wasTouched, setWasTouched] = useState(false);

  const inputValueIsValid = validation(inputValue);
  const hasError = !inputValueIsValid && wasTouched;

  const inputValueChangeHandler = (event) => setInputValue(event.target.value);
  const inputBlurredHandler = () => setWasTouched(true);
  const resetInput = () => {
    setInputValue('');
    setWasTouched(false);
  };
  return {
    inputValue,
    inputValueIsValid,
    hasError,
    inputValueChangeHandler,
    inputBlurredHandler,
    resetInput
  };
};

export default useForm;
