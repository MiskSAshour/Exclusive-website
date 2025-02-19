import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import SignUp from "./Components/SignUp/SignUp";
import NotFound from "./Components/NotFound/NotFound";
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";
import Account from "./Components/Account/Account";
import CheckOut from "./Components/CheckOut/CheckOut";
import Cart from "./Components/Cart/Cart";
import Wishlist from "./Components/Wishlist/Wishlist";
import LogIn from "./Components/LogIn/LogIn";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { AuthProvider } from "./Context/AuthContext";
import CartProvider from "./Context/CartContext";
import AllProductsPage from "./small Components/AllProducts";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "signup", element: <SignUp /> },
      { path: "productdetails/:productId", element: <ProductDetails /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
      { path: "account", element: <Account /> },
      { path: "checkout", element: <CheckOut /> },
      { path: "cart", element: <Cart /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "login", element: <LogIn /> },
      { path: "products", element: <AllProductsPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={routers} />
      </CartProvider>
    </AuthProvider>
  );
}
