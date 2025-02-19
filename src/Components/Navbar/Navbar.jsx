import { Link, useLocation, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { HeartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import navbar from "./Navbar.module.css";
import { useAuth } from "../../Context/AuthContext";
import { useState, useEffect } from "react";
import user from "../../assets/icons/user.png";
import user2 from "../../assets/icons/user2.png";
import ShoppingCartIcon from "../../assets/icons/Cart1.png";
import searchIcon from "../../assets/icons/search icon.png";
import user_white from "../../assets/icons/user_white.png";
import mallbag from "../../assets/icons/icon-mallbag.png";
import cancel from "../../assets/icons/icon-cancel.png";
import Reviews from "../../assets/icons/Icon-Reviews.png";
import logoutIcon from "../../assets/icons/Icon-logout.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
  { name: "Sign Up", href: "/signup" },
];

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth(); // Use logout from AuthContext
  const location = useLocation();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  // State for cart and wishlist item counts
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("CartData")) || { cart: [] };
    const cartlist = Array.isArray(cart.cart) ? cart.cart : [];

    const wishlistData = JSON.parse(localStorage.getItem("WishlistData")) || {
      wishlist: [],
    };
    const wishlist = Array.isArray(wishlistData.wishlist)
      ? wishlistData.wishlist
      : [];

    setCartItems(cartlist);
    setWishlistItems(wishlist);
  }, []);

  const cartItemCount = cartItems.length;
  const wishlistItemCount = wishlistItems.length;

  const handleMenuItemClick = (path) => {
    navigate(path);
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    setUserMenuOpen(false);
    navigate("/login"); // Redirect to the login page
  };

  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-200">
      {({ open }) => (
        <>
          <div className="container mx-auto pb-2 px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Left: Brand Logo */}
              <div className="flex-shrink-0">
                <Link
                  to="/"
                  className="text-xl md:text-2xl font-bold text-gray-900"
                >
                  Exclusive
                </Link>
              </div>

              {/* Center: Navigation Links (Tablet/Desktop) */}
              <div className="hidden lg:flex items-center space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative hover:text-gray-700 text-base font-normal ${
                      location.pathname === item.href
                        ? "text-gray-900 after:absolute after:-bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-black"
                        : "text-gray-500"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Right: Utility Icons and Toggle Menu */}
              <div className="flex items-center space-x-3">
                {/* Search Bar */}
                <div className="hidden md:flex items-end bg-gray-100 pl-[20px] pr-3 py-[7px] rounded-md shadow-sm gap-[34px]">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="bg-transparent focus:outline-none text-sm text-gray-500 placeholder-gray-400 flex-1"
                  />
                  <button>
                    <img
                      src={searchIcon}
                      alt="search Icon"
                      className="h-5 w-5 text-gray-500"
                    />
                  </button>
                </div>
                {/* Utility Icons */}
                {isLoggedIn && (
                  <div className="flex items-center space-x-3 relative">
                    {/* Wishlist Button with Red Circle and Item Count */}
                    <button
                      onClick={() => navigate("/wishlist")}
                      className="relative hover:text-gray-700 focus:outline-none"
                    >
                      <HeartIcon className="h-6 w-6 lg:h-8 lg:w-8" />
                      {wishlistItemCount > 0 && (
                        <span className="absolute -top-[3px] -right-1 w-4 h-[17px] bg-red-500 text-white font-poppins text-[12px] leading-[18px] rounded-full flex items-center justify-center">
                          {wishlistItemCount}
                        </span>
                      )}
                    </button>
                    {/* Cart Button with Red Circle and Item Count */}
                    <button
                      onClick={() => navigate("/cart")}
                      className="relative hover:text-gray-700 focus:outline-none"
                    >
                      <img
                        src={ShoppingCartIcon}
                        className="h-6 w-6 lg:h-8 lg:w-8"
                      />
                      {cartItemCount > 0 && (
                        <span className="absolute -top-[3px] -right-1 w-4 h-[17px] bg-red-500 text-white font-poppins text-[12px] leading-[18px] rounded-full flex items-center justify-center">
                          {cartItemCount}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="hover:text-gray-700 focus:outline-none relative"
                      onMouseOver={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <img
                        src={userMenuOpen || isHovered ? user2 : user}
                        className="h-6 w-6 lg:h-8 lg:w-8"
                        alt="user icon"
                      />
                    </button>

                    {/* User Menu */}
                    {userMenuOpen || isHovered ? (
                      <div
                        className={`${navbar.userMenu} w-[224px] h-[208px] absolute top-[calc(100%+8px)] right-0 z-50 shadow-lg rounded text-white backdrop-filter backdrop-blur-[150px] bg-[#000000AA]`}
                      >
                        <ul className="font-poppins text-sm pl-5 pt-[18px]">
                          <li
                            onClick={() => handleMenuItemClick("/account")}
                            className="flex w-full hover:bg-gray-100 cursor-pointer gap-4 items-center mb-[13px]"
                          >
                            <img
                              src={user_white}
                              className="w-6 h-6"
                              alt="Manage My Account"
                            />
                            Manage My Account
                          </li>
                          <li
                            onClick={() => handleMenuItemClick("/orders")}
                            className="flex w-full hover:bg-gray-100 cursor-pointer gap-4 items-center mb-[13px]"
                          >
                            <img
                              src={mallbag}
                              className="w-6 h-6"
                              alt="My Orders"
                            />
                            My Orders
                          </li>
                          <li
                            onClick={() =>
                              handleMenuItemClick("/cancellations")
                            }
                            className="flex w-full hover:bg-gray-100 cursor-pointer gap-4 items-center mb-[13px]"
                          >
                            <img
                              src={cancel}
                              className="w-6 h-6"
                              alt="My Cancellations"
                            />
                            My Cancellations
                          </li>
                          <li
                            onClick={() => handleMenuItemClick("/reviews")}
                            className="flex w-full hover:bg-gray-100 cursor-pointer gap-4 items-center mb-[13px]"
                          >
                            <img
                              src={Reviews}
                              className="w-6 h-6"
                              alt="My Reviews"
                            />
                            My Reviews
                          </li>
                          <li
                            onClick={handleLogout}
                            className="flex w-full hover:bg-gray-100 cursor-pointer gap-4 items-center mb-[13px]"
                          >
                            <img
                              src={logoutIcon}
                              className="w-6 h-6"
                              alt="Logout"
                            />
                            Logout
                          </li>
                        </ul>
                      </div>
                    ) : null}
                  </div>
                )}
                {/* Toggle Menu for Small Screens */}
                <Disclosure.Button className="inline-flex lg:hidden items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Menu */}
          <Disclosure.Panel className="lg:hidden">
            <div className="px-4 pt-4 pb-3 space-y-3">
              {/* Search Bar */}
              <div className="md:hidden flex items-center bg-gray-100 px-4 py-1 md:p-0 rounded md:rounded-md shadow-sm">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent focus:outline-none pr-5 text-sm text-gray-500 placeholder-gray-400 flex-1"
                />
                <button>
                  <img
                    src={searchIcon}
                    alt="search Icon"
                    className="h-5 w-5 text-gray-500"
                  />
                </button>
              </div>

              {/* Mobile/Tablet Navigation Links */}
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={`block text-base font-medium ${
                    location.pathname === item.href
                      ? "text-gray-900 underline"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
