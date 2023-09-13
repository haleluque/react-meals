import { useState } from "react";
import useForm from "../../hooks/useForm";
import classes from "./CheckoutForm.module.css";

const CheckoutForm = (props) => {
  const validateEmpty = (value) => value.trim() !== "";
  const characteresValidation = (value) => value.trim().length <= 5;

  const {
    inputValue: enteredName,
    inputValueIsValid: nameIsValid,
    hasError: nameHasError,
    inputValueChangeHandler: nameValueChageHandler,
    inputBlurredHandler: nameBlurHandler,
    resetInput: resetNameInputValue,
  } = useForm(validateEmpty);
  const {
    inputValue: enteredStreet,
    inputValueIsValid: streetIsValid,
    hasError: streetHasError,
    inputValueChangeHandler: streetValueChageHandler,
    inputBlurredHandler: streetBlurHandler,
    resetInput: resetStreetInputValue,
  } = useForm(validateEmpty);
  const {
    inputValue: enteredPostalCode,
    inputValueIsValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    inputValueChangeHandler: postalCodeValueChageHandler,
    inputBlurredHandler: postalCodeBlurHandler,
    resetInput: resetPostalCodeInputValue,
  } = useForm(validateEmpty && characteresValidation);
  const {
    inputValue: enteredCity,
    inputValueIsValid: cityIsValid,
    hasError: cityHasError,
    inputValueChangeHandler: cityValueChageHandler,
    inputBlurredHandler: cityBlurHandler,
    resetInput: resetCityInputValue,
  } = useForm(validateEmpty);
  const [formIsValid, setFormIsValid] = useState(true);

  const onSubmitFormHandler = (event) => {
    event.preventDefault();
    nameBlurHandler();
    streetBlurHandler();
    postalCodeBlurHandler();
    cityBlurHandler();
    if (
      !formIsValid ||
      !nameIsValid ||
      !streetIsValid ||
      !postalCodeIsValid ||
      !cityIsValid
    ) {
      setFormIsValid(false);
      return;
    }
    resetForm();
    const personalInfo = {
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    };
    props.onConfirmSubmitInfo(personalInfo);
  };

  const resetForm = () => {
    resetNameInputValue();
    resetStreetInputValue();
    resetPostalCodeInputValue();
    resetCityInputValue();
    setFormIsValid(true);
  };

  const onCancelFormSubmition = () => {
    resetForm();
    props.onCancel();
  };

  const validateeFieldErrorClasses = (fieldIsValid) =>
    `${classes.control} ${fieldIsValid ? classes.invalid : ""}`;

  return (
    <form className={classes.form} onSubmit={onSubmitFormHandler}>
      <div className={validateeFieldErrorClasses(nameHasError)}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameValueChageHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameHasError && (
          <p className={classes["error-message"]}>Name field is mandatory</p>
        )}
      </div>
      <div className={validateeFieldErrorClasses(streetHasError)}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetValueChageHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
        {streetHasError && (
          <p className={classes["error-message"]}>Street field is mandatory</p>
        )}
      </div>
      <div className={validateeFieldErrorClasses(postalCodeHasError)}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="number"
          id="postal"
          onChange={postalCodeValueChageHandler}
          onBlur={postalCodeBlurHandler}
          value={enteredPostalCode}
        />
        {postalCodeHasError && (
          <p className={classes["error-message"]}>
            Postal Code field is mandatory or cannot be more than 5 characters
          </p>
        )}
      </div>
      <div className={validateeFieldErrorClasses(cityHasError)}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityValueChageHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
        {cityHasError && (
          <p className={classes["error-message"]}>City field is mandatory</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onCancelFormSubmition}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
