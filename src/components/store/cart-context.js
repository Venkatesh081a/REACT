import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItems: () => {},
  removeItems: () => {},
  clearItems: () => {},
});

export default CartContext;
