import React from "react";
import Card from "../Card/Card";
import MealItem from "../MealItem/MealItem";
import styles from "./MealItemsList.module.css";

const MealItemsList = (props) => {
  return (
    <Card className={styles["mealslist-container"]}>
      {props.loadingData && <h2>Fetching Data From Server, Please Wait...</h2>}
      {props.loadingData && props.hasError && (
        <h2>Error Occured while Fetching Data</h2>
      )}
      {props.data.map((item) => (
        <MealItem
          id={item.id}
          key={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
        />
      ))}
    </Card>
  );
};

export default MealItemsList;
