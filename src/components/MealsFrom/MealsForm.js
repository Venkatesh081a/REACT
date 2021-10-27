import React, { useState, useContext } from "react";
import CartContext from "../store/cart-context";

import styles from "./MealsForm.module.css";

const MealsForm = (props) => {
  const [enteredAmount, setEnterdAmount] = useState("1");

  const amountChangeHandler = (event) => {
    setEnterdAmount(event.target.value);
  };

  const cartCtx = useContext(CartContext);
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    const item = {
      id: props.id,
      name: props.name,
      price: props.price,
      amount: +enteredAmount,
    };
    cartCtx.addItems(item);
  };

  return (
    <form className={styles.form} onSubmit={formSubmissionHandler}>
      <div className={styles.forminput}>
        <label>Amount</label>
        <input
          type="number"
          value={+enteredAmount}
          onChange={amountChangeHandler}
        ></input>
      </div>
      <div className={styles.formbtn}>
        <button className={styles.btnadd}>+Add</button>
      </div>
    </form>
  );
};

export default MealsForm;
