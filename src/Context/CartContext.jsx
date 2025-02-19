import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Load cart and wishlist data from localStorage on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("CartData"));
    const storedWishlist = JSON.parse(localStorage.getItem("WishlistData")) || {
      wishlist: [],
    };

    if (storedData && Array.isArray(storedData.cart)) {
      setCart(storedData.cart);
    }
    if (Array.isArray(storedWishlist.wishlist)) {
      setWishlist(storedWishlist.wishlist);
    }
  }, []);

  // Save cart and wishlist data to localStorage whenever they change
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("CartData", JSON.stringify({ cart }));
    }
  }, [cart]);

  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem("WishlistData", JSON.stringify({ wishlist }));
    }
  }, [wishlist]);

  // Add product to cart
  const addToCart = (componentName, product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.componentName === componentName
      );

      let newCart;
      if (existingProductIndex !== -1) {
        // Ensure userQuantity does not exceed available stock
        if (prevCart[existingProductIndex].userQuantity < product.quantity) {
          newCart = [...prevCart];
          newCart[existingProductIndex] = {
            ...newCart[existingProductIndex],
            userQuantity: newCart[existingProductIndex].userQuantity + 1,
          };
        } else {
          return prevCart; // Return previous cart if max stock is reached
        }
      } else {
        // Add new product with userQuantity = 1, only if stock allows
        if (product.quantity > 0) {
          newCart = [
            ...prevCart,
            { ...product, componentName, userQuantity: 1 },
          ];
        } else {
          return prevCart;
        }
      }

      localStorage.setItem("CartData", JSON.stringify({ cart: newCart }));
      setShowSuccessModal(true);
      return newCart;
    });
  };

  const addToWishlist = (product, add = true) => {
    setWishlist((prevWishlist) => {
      if (add) {
        // Add the product if not already in the wishlist
        if (!prevWishlist.some((item) => item.id === product.id)) {
          return [...prevWishlist, product];
        }
      } else {
        // Remove the product if it's in the wishlist
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return prevWishlist;
    });
  };

  const cartItemCount = cart?.length || 0;
  const wishlistItemCount = wishlist?.length || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        addToWishlist,
        cartItemCount,
        wishlistItemCount,
      }}
    >
      {children}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <p className="text-green-600 font-semibold">
              Product added to cart successfully!
            </p>
            <button
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => setShowSuccessModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

export default CartProvider;
