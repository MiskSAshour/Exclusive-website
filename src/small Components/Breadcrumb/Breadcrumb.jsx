import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Breadcrumb.module.css";

export default function Breadcrumb() {
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const users = JSON.parse(localStorage.getItem("users"));

      if (currentUser) {
        setUserName(currentUser.name || "Guest");
        setIsLoggedIn(true);
      } else if (users && location.pathname === "/signup") {
        const lastUser = users[users.length - 1];
        setUserName(lastUser.name || "New User");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error accessing localStorage", error);
    }
  }, [location.pathname]);

  const pathnames = location.pathname.split("/").filter((x) => x);
  const routeLabels = {
    account: "My Account",
    productdetails: "Product Details",
    contact: "Contact",
    about: "About",
    checkout: "Checkout",
    cart: "Cart",
    wishlist: "Wishlist",
    login: "Login",
    forgotpassword: "Forgot Password",
    products: "Products",
  };

  // Checking for valid routes
  const isValidRoute = pathnames.every((value) =>
    Object.keys(routeLabels).includes(value.toLowerCase())
  );

  // Skip breadcrumb for these routes
  if (
    ["/", "/login", "/signup", "/wishlist"].includes(location.pathname) ||
    location.pathname.includes("/productdetails")
  ) {
    return null;
  }

  // Custom breadcrumb for the checkout page
  if (location.pathname === "/checkout") {
    const checkoutBreadcrumb = [
      { path: "/account", label: "Account" },
      { path: "/account", label: "My Account" },
      { path: "/products", label: "Product" },
      { path: "/cart", label: "View Cart" },
      { path: "/checkout", label: "CheckOut" }, // Styled in bold
    ];

    return (
      <div className={styles.breadcrumbContainer}>
        <div className={styles.breadcrumbLinks}>
          {checkoutBreadcrumb.map((item, index) => {
            const isLast = index === checkoutBreadcrumb.length - 1;
            return (
              <span key={item.path} className={styles.breadcrumbWrapper}>
                {index !== 0 && <span className={styles.separator}> / </span>}
                {isLast ? (
                  <span className={styles.breadcrumbItemActive}>
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.path} className={styles.breadcrumbItem}>
                    {item.label}
                  </Link>
                )}
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.breadcrumbContainer}>
      <div className={styles.breadcrumbLinks}>
        <Link to="/" className={styles.breadcrumbItem}>
          Home
        </Link>
        {!isValidRoute ? (
          <span className={styles.breadcrumbWrapper}>
            <span className={styles.separator}>/</span>
            <span className={styles.breadcrumbItemActive}>404 Error</span>
          </span>
        ) : (
          pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const label =
              routeLabels[value.toLowerCase()] || value.replace(/-/g, " "); // Display original path if no label is found

            return (
              <span key={to} className={styles.breadcrumbWrapper}>
                <span className={styles.separator}>/</span>
                {isLast ? (
                  <span className={styles.breadcrumbItemActive}>{label}</span>
                ) : (
                  <Link to={to} className={styles.breadcrumbItem}>
                    {label}
                  </Link>
                )}
              </span>
            );
          })
        )}
      </div>

      {/* Greeting Message - Only on Account Page */}
      {location.pathname === "/account" && (
        <div className={styles.greeting}>
          <span>
            Welcome!{" "}
            <span className={styles.userName}>
              {isLoggedIn ? userName : "Guest"}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
