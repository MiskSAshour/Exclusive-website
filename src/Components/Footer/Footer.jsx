import styles from "./Footer.module.css";
import qrCode from "../../assets/images/Qr Code.png";
import googlePlay from "../../assets/images/GooglePlay.png";
import appStore from "../../assets/images/AppStore.png";
import Facebook from "../../assets/icons/Icon-Facebook.png";
import Instagram from "../../assets/icons/icon-instagram.png";
import Twitter from "../../assets/icons/Icon-Twitter.png";
import Linkedin from "../../assets/icons/Icon-Linkedin.png";
import send from "../../assets/icons/icon-send.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <>
      <footer className={styles.footer}>
        <section className={styles.container}>
          <section className={styles.ParentComponent}>
            <div className={styles.footerUl}>
              {/* Brand Logo */}
              <Link className={`font-inter ${styles.brand}`} to="/">
                Exclusive
              </Link>

              {/* Subscribe Heading */}
              <h3 className={styles.brand}>Subscribe</h3>

              {/* Offer Description */}
              <ul>
                <li>Get 10% off your first order</li>
              </ul>

              {/* Email Subscription Form */}
              <form className={styles.emailInputContainer}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Enter your email to subscribe"
                  className={styles.emailInput}
                  required
                />
                <button
                  type="submit"
                  className={styles.emailSubmitButton}
                  aria-label="Submit"
                >
                  <img src={send} alt="Send" />
                </button>
              </form>
            </div>

            {/* Support Section */}
            <div className={styles.footerUl}>
              <h3>Support</h3>
              <ul>
                <li>
                  <Link to="/support/address">
                    111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh
                  </Link>
                </li>
                <li>
                  <a href="mailto:exclusive@gmail.com">exclusive@gmail.com</a>
                </li>
                <li>
                  <a href="tel:+88015888889999">+88015-88888-9999</a>
                </li>
              </ul>
            </div>

            <div className={styles.footerUl}>
              {/* Account Heading */}
              <h3>Account</h3>

              {/* Account Links */}
              <ul className={styles.gridList}>
                <li>
                  <Link to="#" onClick={() => handleNavigation("/account")}>
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={() => handleNavigation("/login")}>
                    Login
                  </Link>
                  <span> / </span>
                  <Link to="#" onClick={() => handleNavigation("/signup")}>
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={() => handleNavigation("/cart")}>
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={() => handleNavigation("/wishlist")}>
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={() => handleNavigation("/")}>
                    Shop
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.footerUl}>
              <h3>Quick Link</h3>
              <ul className={styles.gridList}>
                <li>Privacy Policy</li>
                <li>Terms Of Use</li>
                <li>FAQ</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className={styles.footerUl}>
              <h3>Download App</h3>
              <small>Save $3 with App New User Only</small>
              <div className={styles.QRCode}>
                <img src={qrCode} alt="QR Code" className="w-20 h-20 " />
                <div>
                  <img
                    src={googlePlay}
                    alt="Google Play"
                    className="w-28 h-10"
                  />
                  <img src={appStore} alt="App Store" className="w-28 h-10" />
                </div>
              </div>
              <ul className={styles.socialMedia}>
                <li>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <img src={Facebook} alt="Facebook" className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <img src={Twitter} alt="Twitter" className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <img src={Instagram} alt="Instagram" className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <img src={Linkedin} alt="LinkedIn" className="w-6 h-6" />
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </section>
        {/* Footer Bottom Section */}
        <section className={styles.footerContent}>
          <p className={styles.copyrightText}>
            <span className={styles.copyright}>&copy;</span>
            Copyright Rimel {new Date().getFullYear()}. All rights reserved.
          </p>
        </section>
      </footer>
    </>
  );
}
