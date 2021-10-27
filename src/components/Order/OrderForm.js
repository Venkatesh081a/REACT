import React, { useContext } from "react";
import Card from "../Card/Card";
import useInput from "../hooks/use-input";
import CartContext from "../store/cart-context";
import styles from "./OrderForm.module.css";

const OrderForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: enteredFirstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: fistNameInputBlurHadler,
    reset: firstNameInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredContactnumber,
    isValid: enteredContactnumberIsValid,
    hasError: enteredContactnumberHasError,
    valueChangeHandler: contactnumberChangeHandler,
    inputBlurHandler: contactnumberInputBlurHadler,
    reset: contactnumberInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHadler,
    reset: emailInputReset,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: enteredAddressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHadler,
    reset: addressReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (
    enteredFirstNameIsValid &&
    enteredContactnumberIsValid &&
    enteredEmailIsValid &&
    enteredAddressIsValid
  ) {
    formIsValid = true;
  }

  const ctx = useContext(CartContext);
  const itemsPresentInCart = ctx.items;

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (
      !enteredFirstNameIsValid &&
      !enteredContactnumberIsValid &&
      !enteredEmailIsValid &&
      !enteredAddressIsValid
    ) {
      return;
    }

    const itemsList = [];
    for (const item in itemsPresentInCart) {
      itemsList.push({
        id: itemsPresentInCart[item].id,
        name: itemsPresentInCart[item].name,
        totalPrice:
          itemsPresentInCart[item].price * itemsPresentInCart[item].amount,
      });
    }
    const orderDetails = {
      customerInfo: {
        name: enteredFirstName,
        contact: enteredContactnumber,
        email: enteredEmail,
        address: enteredAddress,
      },
      orderedItems: itemsList,
    };

    fetch("https://react-https-163f6-default-rtdb.firebaseio.com/Orders.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    });

    firstNameInputReset();
    contactnumberInputReset();
    emailInputReset();
    addressReset();

    props.onHideCheckoutForm();
    props.onShowOrderMessage();
  };

  const cancelOrderHandler = () => {
    props.onHideCheckoutForm();
    props.onShowCart();
  };

  return (
    <React.Fragment>
      <div className={styles.backdrop}>
        <Card className={styles.orderForm}>
          <h2 className={styles.order}>Checkout </h2>
          <form className={styles["form-container"]}>
            <div
              className={`${styles.firstname} ${
                enteredFirstNameHasError && styles.invalid
              }`}
            >
              <label>Firstname </label>
              <input
                type="text"
                id="firstname"
                placeholder="please enter your firstname"
                onChange={firstNameChangeHandler}
                onBlur={fistNameInputBlurHadler}
                value={enteredFirstName}
              />
            </div>
            {enteredFirstNameHasError && (
              <p className={styles["error-text"]}>please enter firstname</p>
            )}
            <div
              className={`${styles.lastname} ${
                enteredContactnumberHasError && styles.invalid
              }`}
            >
              <label>Contact number </label>
              <input
                type="tel"
                id="lastname"
                placeholder="please enter your contact number"
                onChange={contactnumberChangeHandler}
                onBlur={contactnumberInputBlurHadler}
                value={enteredContactnumber}
              />
            </div>
            {enteredContactnumberHasError && (
              <p className={styles["error-text"]}>
                please enter contact number
              </p>
            )}
            <div
              className={`${styles.email} ${
                enteredEmailHasError && styles.invalid
              }`}
            >
              <label>Email </label>
              <input
                type="email"
                id="email"
                placeholder="please enter your email"
                onChange={emailChangeHandler}
                onBlur={emailInputBlurHadler}
                value={enteredEmail}
              />
            </div>
            {enteredEmailHasError && (
              <p className={styles["error-text"]}>please enter email</p>
            )}
            <div
              className={`${styles.address} ${
                enteredAddressHasError && styles.invalid
              }`}
            >
              <label>Delivery address </label>
              <textarea
                id="address"
                placeholder="please enter your delivery address"
                onChange={addressChangeHandler}
                onBlur={addressBlurHadler}
                value={enteredAddress}
              />
            </div>
            {enteredAddressHasError && (
              <p className={styles["error-text"]}>please enter valid address</p>
            )}
            <div className={styles["form-actions"]}>
              <button
                type="submit"
                className={styles["btn-submit"]}
                onClick={formSubmissionHandler}
                disabled={!formIsValid}
              >
                Place Order
              </button>
              <button
                type="button"
                className={styles["btn-cancel"]}
                onClick={cancelOrderHandler}
              >
                Cancel Order
              </button>
            </div>
          </form>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default OrderForm;
