import "./App.css";
import React, { useEffect, useState } from "react";
import CardSummary from "./components/CardSummary/CardSummary";
import Header from "./components/Header/Header";
import MealItemsList from "./components/MealItemsList/MealItemsList";
import CartModal from "./components/Cart/CartModal";
import CartContextProvider from "./components/store/CartContextProvider";
import OrderForm from "./components/Order/OrderForm";
import OrderPlacedMessage from "./components/Order/OrderPlacedMessage";

function App() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function FetchMealsDataFromDB() {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://react-https-163f6-default-rtdb.firebaseio.com/Meals.json"
      );
      if (!response.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        const mealObject = {
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        };
        loadedMeals.push(mealObject);
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    } catch (error) {
      setError(true);
    }
  }
  useEffect(() => {
    FetchMealsDataFromDB();
  }, []);
  const [cartDisplayState, setCartDisplayState] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderPlacedMessage, setOrderPlacedMessage] = useState(false);

  const showCartHandler = () => {
    setCartDisplayState(true);
  };
  const hideCartHandler = () => {
    setCartDisplayState(false);
  };

  const showOrderFormHandler = () => {
    setShowOrderForm(true);
  };
  const hideOrderFormHandler = () => {
    setShowOrderForm(false);
  };

  const showOrderPlacedMessageHandler = () => {
    setOrderPlacedMessage(true);
  };

  const hideOrderPlacedMessageHandler = () => {
    setOrderPlacedMessage(false);
  };

  return (
    <div className="App">
      <CartContextProvider>
        {cartDisplayState && (
          <CartModal
            onCloseCart={hideCartHandler}
            onDisplayCheckoutForm={showOrderFormHandler}
          />
        )}
        <Header onShowCart={showCartHandler} />
        <CardSummary />
        <MealItemsList data={meals} loadingData={isLoading} hasError={error} />
        {showOrderForm && (
          <OrderForm
            onHideCheckoutForm={hideOrderFormHandler}
            onShowOrderMessage={showOrderPlacedMessageHandler}
            onShowCart={showCartHandler}
          />
        )}
        {orderPlacedMessage && (
          <OrderPlacedMessage
            onHideOrderMessage={hideOrderPlacedMessageHandler}
          />
        )}
      </CartContextProvider>
    </div>
  );
}

export default App;
