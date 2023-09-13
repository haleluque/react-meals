import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendHttpRequest: obtainMeals } = useHttp();

  useEffect(() => {
    const loadMeals = (data) => {
      const currentMeals = [];
      for (const meal in data) {
        currentMeals.push({
          id: meal,
          name: data[meal].name,
          description: data[meal].description,
          price: data[meal].price,
        });
      }
      setMeals(currentMeals);
    };

    obtainMeals(
      {
        url: "https://react-test-db-e8329-default-rtdb.firebaseio.com/meals.json",
      },
      loadMeals
    );
  }, [obtainMeals]);

  const mealsList = !error ? (
    meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ))
  ) : (
    <section className={classes.mealsError}>
      <p>There was an error loading the meals</p>
    </section>
  );

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading....</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
