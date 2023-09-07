import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);

  const [bnIsHighlighted, setBnIsHighlighted] = useState(false);

  const { items } = ctx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [items]);

  const numberOfCartItems = items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${bnIsHighlighted ? classes.bump : ""}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
