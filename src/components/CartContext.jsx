import React, { createContext, useState, useContext } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component to wrap the app and provide cart functionality
export const CartProvider = ({ children }) => {
  // State to track cart items
  const [cart, setCart] = useState([]);
  // State to track the count of items in the cart
  const [cartCount, setCartCount] = useState(0);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setCartCount(prevCount => prevCount + 1); // Increment cart count
  };

  // Function to remove a product from the cart
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    setCartCount(prevCount => prevCount - 1); // Decrement cart count
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]); // Clear all items in the cart
    setCartCount(0); // Reset cart count to 0
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
