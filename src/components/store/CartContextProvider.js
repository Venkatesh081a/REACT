import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartItemsReducer = (state, action) => {
  if (action.type === "ADD_CART_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    // console.log(existingCartItem);
    let updatedCartItems;
    if (existingCartItem) {
      let updatedCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedCartItems = [...state.items];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    } else {
      updatedCartItems = state.items.concat(action.item);
    }

    return { items: updatedCartItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "REMOVE_CART_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR_CART_ITEMS") {
    return { items: [], totalAmount: 0 };
  }

  return { items: [], totalAmount: 0 };
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(cartItemsReducer, {
    items: [],
    totalAmount: 0,
  });
  const addItemsToCartHandler = (item) => {
    dispatchCartState({ type: "ADD_CART_ITEM", item: item });
  };
  const removeItemsFromCartHandler = (id) => {
    dispatchCartState({ type: "REMOVE_CART_ITEM", id: id });
  };

  const clearItemsInCartHandler = () => {
    dispatchCartState({ type: "CLEAR_CART_ITEMS" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItems: addItemsToCartHandler,
    removeItems: removeItemsFromCartHandler,
    clearItems: clearItemsInCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
