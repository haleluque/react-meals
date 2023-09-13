import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import useHttp from "../../hooks/useHttp";

const Cart = (props) => {
  const [showForm, setShowForm] = useState(false);
  const ctx = useContext(CartContext);
  const [orderSaved, setOrderSaved] = useState(false);
  const {
    isLoading,
    error,
    sendHttpRequest: insertOrderInformation,
  } = useHttp();

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    ctx.addItem(item);
  };
  const resetCartHandler = () => {
    ctx.resetCart();
  };

  const onCancelOrder = () => {
    setShowForm(false);
    props.onHideCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          //.bind() preconfigure a function to receive specific params when excecuted
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const onOrderFoodButtonClickHandler = () => {
    setShowForm(true);
    setOrderSaved(false);
  };

  const onSubmitOrderInformation = (data) => {
    data = { ...data, items: ctx.items };
    insertOrderInformation(
      {
        url: "https://react-test-db-e8329-default-rtdb.firebaseio.com/order.json",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      },
      handleNewInfoInsertion
    );
  };

  const handleNewInfoInsertion = () => {
    setOrderSaved(true);
    resetCartHandler();
  };

  const isSubmitingOrder = <p>Saving order data...</p>;
  const wasSubmitedOrder = <p>Successfully saved the order data...</p>;
  const checkoutForm = (
    <CheckoutForm
      onCancel={onCancelOrder}
      onConfirmSubmitInfo={onSubmitOrderInformation}
    />
  );

  const onModalContentHandler = () => {
    if (!showForm) {
      return (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={props.onHideCart}
            >
              Close
            </button>
            {hasItems && (
              <button
                className={classes.button}
                onClick={onOrderFoodButtonClickHandler}
              >
                Order
              </button>
            )}
          </div>
        </>
      );
    } else {
      return (
        <div>
          {isLoading && !orderSaved ? isSubmitingOrder : ''}
          {!orderSaved && checkoutForm}
          {orderSaved && wasSubmitedOrder}
          {error && <p>{error}</p>}
        </div>
      );
    }
  };

  return <Modal onClick={props.onHideCart}>{onModalContentHandler()}</Modal>;
};

export default Cart;
