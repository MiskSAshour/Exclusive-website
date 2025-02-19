import PropTypes from "prop-types";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Header({ adText }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const languages = ["English", "العربية"];

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header aria-label="Promotional Header">
      <div className={styles.headerBar}>
        {/* Promotional Content */}
        <div className={styles.adContent}>
          <span>
            {adText}
            <a href="#shop" className={styles.shopNow}>
              ShopNow
            </a>
          </span>
        </div>

        {/* Language Switcher */}
        <div className={styles.languageSwitch} onClick={toggleDropdown}>
          <span>English</span>
          <span className={styles.arrow}>
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
          {isDropdownOpen && (
            <div className={styles.languageDropdown}>
              {languages.map((language) => (
                <button key={language} className={styles.languageOption}>
                  {language}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  adText: PropTypes.string.isRequired,
};
