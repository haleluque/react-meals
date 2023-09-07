import { createContext } from "react";

const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (items) => {  },
    removeItem: (id) => {  }
});

export default CartContext;