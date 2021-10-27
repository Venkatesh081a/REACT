import React, { useContext } from "react";
import Card from "../Card/Card";
import CartContext from "../store/cart-context";
import styles from "./OrderPlacedMessage.module.css";

const OrderPlacedMessage = (props) => {
  const ctx = useContext(CartContext);
  const orderPlacedHandler = () => {
    props.onHideOrderMessage();
    ctx.clearItems();
  };

  return (
    <React.Fragment>
      <div className={styles.backdrop}>
        <Card className={styles["order-message-container"]}>
          <div className={styles.orderplacedicon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles["order-icon"]}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className={styles["order-info"]}>
            <h2>Order Successfully Placed</h2>
            <p>
              Your invoice number is{" "}
              {Math.round(Math.random() * (1000 - 100) + 10)}{" "}
            </p>
            <p>We will process your order as soon as possible</p>
          </div>
          <div className={styles["order-actions"]}>
            <button
              className={styles["btn-continue"]}
              onClick={orderPlacedHandler}
            >
              continue shopping
            </button>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default OrderPlacedMessage;
