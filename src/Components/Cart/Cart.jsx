import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DropDown from "../../assets/icons/DropDownSmall.png";
import DropUp from "../../assets/icons/DropUpSmall.png";
import styles from "./Cart.module.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("CartData")) || {
      cart: [],
    };
    setCartItems(storedCart.cart);
  }, []);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cartItems];
    if (newQuantity > updatedCart[index].quantity) {
      alert("Not enough stock available!");
      return;
    }
    updatedCart[index].userQuantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem("CartData", JSON.stringify({ cart: updatedCart }));
  };

  const handleBackToHome = () => navigate("/");
  const handleUpdateCart = () => alert("Cart updated!");
  const handleCheckout = () => navigate("/checkout");

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index); // Remove item by index
    setCartItems(updatedCart);
    localStorage.setItem("CartData", JSON.stringify({ cart: updatedCart }));
  };

  const totalSubtotal = useMemo(() => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.userQuantity, 0)
      .toFixed(2);
  }, [cartItems]);

  return (
    <div className="min-h-screen font-poppins text-base">
      <div className="max-w-7xl mx-auto">
        <div className="p-2">
          <table
            className={`${styles.myTable} p-4 w-full text-left mb-4 mx-auto`}
          >
            <thead
              style={{ boxShadow: "0px 1px 13px 0px rgba(0, 0, 0, 0.05)" }}
            >
              <tr className="rounded shadow-sm flex flex-wrap items-center justify-between py-6 px-4 sm:px-10">
                <div className="flex justify-between w-full sm:w-[40%] mb-4 sm:mb-0">
                  <th className="font-poppins text-base font-normal">
                    Product
                  </th>
                  <th className="font-poppins text-base font-normal">Price</th>
                </div>
                <div className="flex justify-between w-full sm:w-[40%] mb-4 sm:mb-0">
                  <th className="font-poppins text-base font-normal">
                    Quantity
                  </th>
                  <th className="font-poppins text-base font-normal">
                    Subtotal
                  </th>
                </div>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <tr
                    key={index}
                    className="my-10 rounded shadow-sm flex flex-wrap items-center justify-between py-6 px-4 sm:px-10 md:h-[102px] xl:h-auto"
                    style={{
                      boxShadow: "0px 1px 13px 0px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <div className="flex justify-between items-center w-full sm:w-[40%]">
                      <td className="py-4 flex items-center flex-wrap sm:flex-nowrap">
                        <div className="relative group text-center">
                          <img
                            src={item.imageCover}
                            alt={item.title}
                            className="w-12 h-12 xl:w-[54px] xl:h-[54px] object-cover rounded"
                          />

                          <button
                            onClick={() => handleRemoveItem(index)}
                            className="absolute -top-3 -left-3 bg-red-700 text-white font-bold w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            x
                          </button>
                        </div>

                        <span
                          className={`font-poppins text-base font-normal ml-5 mt-4 ${styles.truncate} w-32 md:w-24 xl:w-32`}
                          title={item.title}
                        >
                          {item.title}
                        </span>
                      </td>
                      <td className="font-poppins text-base font-normal lg:mr-0">
                        ${item.price}
                      </td>
                    </div>

                    <div className="flex justify-between w-full sm:w-[40%]">
                      <td className="mr-32 lg:mr-40 font-poppins text-base font-normal flex items-center py-[6px] px-3 text-center border">
                        <div className="w-12 h-8 flex justify-between items-center">
                          <input
                            type="text"
                            value={String(item.userQuantity).padStart(2, "0")}
                            onChange={(e) => {
                              const value = parseInt(e.target.value, 10) || 1;
                              handleQuantityChange(index, Math.max(1, value));
                            }}
                            className="w-5"
                          />
                          <div className="flex flex-col">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  index,
                                  item.userQuantity + 1
                                )
                              }
                            >
                              <img
                                src={DropUp}
                                className="w-4 h-4"
                                alt="Increase Quantity"
                              />
                            </button>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  index,
                                  Math.max(1, item.userQuantity - 1)
                                )
                              }
                            >
                              <img
                                src={DropDown}
                                className="w-4 h-4"
                                alt="Decrease Quantity"
                              />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-800 mr-8 lg:mr-4">
                        ${item.price * item.userQuantity}
                      </td>
                    </div>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-600">
                    Your cart is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 lg:space-y-0 p-4 sm:p-2">
            <button
              onClick={handleBackToHome}
              className="text-black border border-black rounded px-12 py-4 hover:bg-gray-200 w-full sm:w-auto"
            >
              Return To Shop
            </button>
            <button
              className="text-black border border-black rounded px-12 py-4 hover:bg-gray-200 w-full sm:w-auto"
              onClick={handleUpdateCart}
            >
              Update Cart
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start mt-20 mb-10 gap-8 xl:gap-0 p-4">
          <div className="flex flex-col xl:flex-row items-center md:items-start xl:items-center w-full lg:w-1/2 xl:w-auto gap-y-4 xl:gap-0">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border border-black rounded py-4 pl-6 w-full lg:w-10/12 xl:w-[300px] xl:mr-4"
            />
            <button className="bg-[#DB4444] font-medium text-base text-white rounded px-8 py-2 xl:px-12 xl:py-4 hover:bg-red-600">
              Apply Coupon
            </button>
          </div>

          <div className="border border-black rounded px-6 py-8 w-full lg:w-[470px] text-center">
            <h3 className="font-poppins text-xl font-medium mb-6">
              Cart Total
            </h3>
            <div className="font-poppins font-normal text-base">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totalSubtotal}</span>
              </div>
              <div className="my-4 border-t border-black"></div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="my-4 border-t border-black"></div>
              <div className="flex justify-between mb-4">
                <span>Total:</span>
                <span>${totalSubtotal}</span>
              </div>
            </div>
            <button
              className="bg-red-500 text-white rounded px-8 py-2 xl:px-12 xl:py-4 font-medium text-base hover:bg-red-600"
              onClick={handleCheckout}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
