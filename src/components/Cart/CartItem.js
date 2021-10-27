import React from "react";
import styles from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <div className={styles.cartItemContainer}>
      <div>
        <h2 className={styles.name}>{props.name}</h2>
        <div className={styles.priceContainer}>
          <h4 className={styles.price}>${props.price}</h4>
          <input value={`x ${props.amount}`}></input>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.btnRemove}
          onClick={props.onRemoveItemsFromCart}
        >
          -
        </button>
        <button className={styles.btnAdd} onClick={props.onAddItemsToCart}>
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
