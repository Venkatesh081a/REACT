import React from "react";
import MealsForm from "../MealsFrom/MealsForm";
import styles from "./MealItem.module.css";

const MealItem = (props) => {
  return (
    <div className={styles["meal-container"]}>
      <div className={styles["meal-details"]}>
        <h3>{props.name}</h3>
        <p className={styles.description}>{props.description}</p>
        <p className={styles.price}>${props.price}</p>
      </div>
      <MealsForm
        id={props.id}
        name={props.name}
        description={props.description}
        price={props.price}
      />
    </div>
  );
};

export default MealItem;
