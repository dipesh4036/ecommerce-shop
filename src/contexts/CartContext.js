import React, { createContext, useState, useEffect } from "react";

// Cart Context
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.amount,
      0
    );
    setTotal(totalPrice);
  }, [cart]);

  useEffect(() => {
    const totalAmount = cart.reduce((acc, item) => acc + item.amount, 0);
    setItemAmount(totalAmount);
  }, [cart]);

  const addToCart = (product, id) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, amount: item.amount + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, amount: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      if (cartItem.amount === 1) {
        removeFromCart(id);
      } else {
        setCart(
          cart.map((item) =>
            item.id === id ? { ...item, amount: item.amount - 1 } : item
          )
        );
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
