import React, { useContext } from "react";
import Card from "../Card/Card";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import styles from "./CartModal.module.css";

const CartModal = (props) => {
  const cartCtx = useContext(CartContext);
  const isItemsPresentInCart = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItems({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItems(id);
  };

  const orderHandler = (event) => {
    props.onCloseCart();
    props.onDisplayCheckoutForm();
  };
  return (
    <React.Fragment>
      <div className={styles.backdrop}>
        <Card className={styles.cartModal}>
          {cartCtx.items.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              amount={item.amount}
              onAddItemsToCart={cartItemAddHandler.bind(null, item)}
              onRemoveItemsFromCart={cartItemRemoveHandler.bind(null, item.id)}
            ></CartItem>
          ))}
          <div className={styles.amountContainer}>
            <h2>Total Amount</h2>
            <h2>${cartCtx.totalAmount.toFixed(2)}</h2>
          </div>
          <div className={styles.actions}>
            <button className={styles.btnClose} onClick={props.onCloseCart}>
              Close
            </button>
            {isItemsPresentInCart && (
              <button className={styles.btnOrder} onClick={orderHandler}>
                Order
              </button>
            )}
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default CartModal;
