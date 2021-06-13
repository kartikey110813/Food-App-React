import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

import CardContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CardContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const removeEventHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const addEventHandler = (item) => {
     cartCtx.addItem({...item,amount:1});
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove = {removeEventHandler.bind(null,item.id)}
          onAdd = {addEventHandler.bind(null,item)} 
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {cartItems}
      <div>
        <span className={classes.total}>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
