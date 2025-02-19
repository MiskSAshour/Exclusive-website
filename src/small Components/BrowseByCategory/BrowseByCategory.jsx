import React, { useState, useEffect } from "react";
import LeftArrow from "../../assets/icons/Fill With Left Arrow.png";
import RightArrow from "../../assets/icons/Fill with Right Arrow.png";
import CellPhone from "../../assets/icons/Category-CellPhone.png";
import whiteCellPhone from "../../assets/icons/Category-CellPhone_white.png";
import Computer from "../../assets/icons/Category-Computer.png";
import whiteComputer from "../../assets/icons/Category-Computer_white.png";
import SmartWatch from "../../assets/icons/Category-SmartWatch.png";
import whiteSmartWatch from "../../assets/icons/Category-SmartWatch_white.png";
import Camera from "../../assets/icons/Category-Camera.png";
import whiteCamera from "../../assets/icons/Category-Camera_white.png";
import Headphone from "../../assets/icons/Category-Headphone.png";
import whiteHeadphone from "../../assets/icons/Category-Headphone_white.png";
import Gamepad from "../../assets/icons/Category-Gamepad.png";
import whiteGamepad from "../../assets/icons/Category-Gamepad_white.png";

const categories = [
  { id: 1, name: "Phones", icon: CellPhone, hoverIcon: whiteCellPhone },
  { id: 2, name: "Computers", icon: Computer, hoverIcon: whiteComputer },
  { id: 3, name: "SmartWatch", icon: SmartWatch, hoverIcon: whiteSmartWatch },
  { id: 4, name: "Camera", icon: Camera, hoverIcon: whiteCamera },
  { id: 5, name: "HeadPhones", icon: Headphone, hoverIcon: whiteHeadphone },
  { id: 6, name: "Gaming", icon: Gamepad, hoverIcon: whiteGamepad },
];

const BrowseByCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);

  // Adjust visibleCount based on screen width
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 640) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 786) {
        setVisibleCount(3);
      } else if (window.innerWidth <= 1024) {
        setVisibleCount(4);
      } else {
        setVisibleCount(6);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const getVisibleCategories = (categories, startIndex) => {
    return [
      ...categories.slice(startIndex),
      ...categories.slice(0, startIndex),
    ].slice(0, visibleCount);
  };

  const visibleCategories = getVisibleCategories(categories, currentIndex);

  return (
    <section className="pb-28 lg:pb-[70px] mx-auto max-w-[18rem] sm:max-w-2xl xl:max-w-[1170px] lg:max-w-4xl">
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div className="flex flex-col w-full sm:w-auto">
          <div className="flex items-center gap-3 pb-3">
            <span className="block rounded w-5 h-10 bg-[#DB4444]"></span>
            <h2 className="font-poppins font-semibold text-sm sm:text-base leading-5 text-[#DB4444]">
              Categories
            </h2>
          </div>
          <h2 className="font-inter text-2xl sm:text-3xl lg:text-4xl leading-tight font-semibold mb-4 sm:mb-6">
            Browse By Category
          </h2>
        </div>
        <div className="flex justify-end items-center mt-4 sm:mt-0">
          <button
            onClick={handlePrev}
            className="text-gray-600 hover:text-black text-lg sm:text-xl lg:text-2xl"
          >
            <img
              src={LeftArrow}
              alt="Left Arrow"
              className="h-8 sm:h-10 mr-2"
            />
          </button>
          <button
            onClick={handleNext}
            className="text-gray-600 hover:text-black text-lg sm:text-xl lg:text-2xl"
          >
            <img src={RightArrow} alt="Right Arrow" className="h-8 sm:h-10" />
          </button>
        </div>
      </div>

      {/* Category Grid */}
      <div
        id="product-slider"
        className="mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8 sm:gap-x-[30px] place-items-center items-center"
      >
        {/* Display all six categories */}
        {visibleCategories.map((category) => (
          <div
            key={category.id}
            className="group h-[145px] w-[170px] flex flex-wrap flex-col items-center justify-center border border-[rgba(0,0,0,0.3)] rounded text-center transform transition-all duration-300 hover:bg-[#DB4444] hover:text-white"
          >
            <div className="flex items-center justify-center w-14 h-14 mb-4 transition-all duration-300 ">
              {/* Dynamically render the correct icon based on hover state */}
              <img
                src={category.icon}
                alt={category.name}
                className="group-hover:hidden"
              />
              <img
                src={category.hoverIcon}
                alt={`${category.name} hover`}
                className="hidden group-hover:block"
              />
            </div>
            <p className="text-base font-normal">{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseByCategory;
