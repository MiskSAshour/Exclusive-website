import { useState, useEffect } from "react";
import styles from "./CheckOut.module.css";
import bankIcons from "../../assets/icons/bankIcon.png";

function CheckOut() {
  const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("CartData")) || {
      cart: [],
    };
    setCartItems(storedCart.cart);
  }, []);

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <section className="mt-20 mb-16 xl:mb-36 py-12 mx-auto px-4 sm:px-6 lg:px-8 max-w-96 sm:max-w-2xl md:max-w-screen-sm xl:max-w-[1280px] lg:max-w-[1000px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 xl:gap-[173px]">
        {/* Billing Details */}
        <div className="w-full">
          <h2 className="font-inter text-[36px] leading-[30px] font-medium mb-12">
            Billing Details
          </h2>
          <form className="w-full">
            <div className="mb-8">
              <label htmlFor="firstName" className="block mb-2">
                First Name<span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                className="border rounded p-3 bg-[#f5f5f5] w-full sm:w-[470px] lg:w-[400px] xl:w-[470px]"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="companyName" className="block mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className="border rounded p-3 bg-[#f5f5f5] w-full sm:w-[470px] lg:w-[400px] xl:w-[470px]"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="streetAddress" className="block mb-2">
                Street Address<span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="streetAddress"
                className="border rounded p-3 bg-[#f5f5f5] w-full sm:w-[470px] lg:w-[400px] xl:w-[470px]"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="Apartment" className="block mb-2">
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                id="Apartment"
                className="border rounded p-3 bg-[#f5f5f5] w-full sm:w-[470px] lg:w-[400px] xl:w-[470px]"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="City" className="block mb-2">
                Town/City<span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="City"
                className="border rounded p-3 bg-[#f5f5f5] w-full sm:w-[470px] lg:w-[400px] xl:w-[470px]"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="Number" className="block mb-2">
                Phone Number<span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="Number"
                className="border rounded p-3 bg-[#f5f5f5] w-full sm:w-[470px] lg:w-[400px] xl:w-[470px]"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="email" className="block mb-2">
                Email Address<span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="border rounded p-3 bg-[#f5f5f5] w-full sm:w-[470px] lg:w-[400px] xl:w-[470px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                checked
                type="checkbox"
                id="save-info"
                className="w-6 h-6 accent-red-500"
              />
              <label
                htmlFor="save-info"
                className="text-base font-poppins font-normal"
              >
                Save this information for faster check-out next time
              </label>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="mt-24 sm:w-[527px] lg:w-2/3 xl:w-[527px]">
          <div className="w-full flex flex-col  md:w-[425px]">
            <div className="mb-8 md:mb-12 max-h-52 sm:max-h-44 overflow-auto">
              <div className="flex flex-col justify-between">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-8"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.imageCover}
                          alt={item.title}
                          className="w-14 mr-6"
                        />
                        <span
                          className={`${styles.truncate} max-w-24 lg:max-w-52`}
                          title={item.title}
                        >
                          {item.title}
                        </span>
                      </div>
                      <span>${item.price}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-600">
                    Your cart is empty.
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between font-poppins text-base font-normal">
              <span>Subtotal:</span>
              <span>
                ${cartItems.reduce((acc, item) => acc + item.price, 0)}
              </span>
            </div>
            <div className="border-t border-black my-4"></div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="border-t border-black my-4"></div>
            <div className="flex justify-between mb-8">
              <span>Total:</span>
              <span>
                ${cartItems.reduce((acc, item) => acc + item.price, 0)}
              </span>
            </div>

            {/* Payment Methods */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <div className="flex justify-between w-full">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="bank"
                      name="payment"
                      value="Bank"
                      checked={paymentMethod === "Bank"}
                      onChange={() => handlePaymentChange("Bank")}
                      className="mr-4"
                    />
                    <label htmlFor="bank">Bank</label>
                  </div>
                  <img
                    src={bankIcons}
                    alt="bankIcons"
                    className="w-28 h-5 xl:w-48 xl:h-7 gap-2"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  value="Cash on delivery"
                  checked={paymentMethod === "Cash on delivery"}
                  onChange={() => handlePaymentChange("Cash on delivery")}
                  className="mr-4"
                />
                <label htmlFor="cod">Cash on delivery</label>
              </div>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="mt-6 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start space-y-4 sm:space-x-2 sm:space-y-0 lg:space-x-0 lg:space-y-4 xl:space-x-3 xl:space-y-0">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border rounded w-full sm:w-[300px] p-4"
            />
            <button className="bg-red-500 text-white py-4 px-12 rounded w-full sm:w-auto">
              Apply Coupon
            </button>
          </div>

          {/* Place Order Button */}
          <button className="bg-red-500 text-white py-4 px-12 rounded mt-6 w-full sm:w-auto">
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
}

export default CheckOut;
