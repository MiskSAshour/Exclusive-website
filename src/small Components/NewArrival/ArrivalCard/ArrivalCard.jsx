import React from "react";
import { Link } from "react-router-dom";
import styles from "./ArrivalCard.module.css";

const ArrivalCard = ({ product }) => {
  return (
    <div
      className={`relative rounded-[4px] h-full flex ${
        product.size === "large"
          ? "items-end justify-center"
          : product.size === "secondSize"
          ? "items-end justify-end"
          : "h-full items-center justify-center"
      }`}
      style={{ backgroundColor: product.backgroundColor }}
    >
      <img
        src={product.img}
        alt={product.name}
        className={`object-contain ${
          product.size === "large"
            ? "xl:h-[511px]"
            : product.size === "secondSize"
            ? "sm:h-72"
            : "h-[85%] md:h-3/4 xl:h-[201px] object-contain"
        }`}
      />

      <div
        className={`absolute bottom-0 left-0 ${
          product.size === "large"
            ? "w-3/5 md:w-5/12 lg:w-4/6 xl:w-1/2 pl-8 pb-8 lg:pl-6 lg:pb-6 xl:pl-8 xl:pb-8"
            : product.size === "secondSize"
            ? "w-[88%] lg:w-[67%] xl:w-2/4 pl-8 pb-8 xl:pl-6 xl:pb-6 lg:pl-8 lg:pb-8"
            : "w-4/5 sm:w-full pl-8 pb-8 xl:pl-6 xl:pb-6 lg:pl-4 lg:pb-4"
        }`}
      >
        <h3 className="font-inter text-xl sm:text-2xl font-semibold tracking-[0.03em] text-[#FAFAFA]">
          {product.name}
        </h3>
        <p
          className={`text-xs sm:text-sm font-poppins font-normal text-[#FAFAFA] ${
            product.size === "large" || product.size === "secondSize"
              ? "py-4"
              : "py-2"
          }`}
        >
          {product.description}
        </p>
        <Link
          className={`${styles.shopNow} text-xs sm:text-base font-medium text-white w-[81px] block`}
          to="/"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default ArrivalCard;
