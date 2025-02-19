import React, { useState, useEffect } from "react";
import iphoneImage from "../../assets/images/iPhone 14 Series.png";
import appleLogo from "../../assets/icons/1200px-Apple_gray_logo 1.png";
import RightArrow from "../../assets/icons/icons arrow-right.png";
import DropDown from "../../assets/icons/DropDown.png";
import DropDown_ from "../../assets/icons/DropDown_.png";
import { Link } from "react-router-dom";

export default function SidebarBanner() {
  const bannerData = [
    {
      id: 1,
      img: iphoneImage,
      title: "iPhone 14 Series",
      subtitle: "Up to 10% off Voucher",
    },
    {
      id: 2,
      img: iphoneImage,
      title: "iPhone 14 Pro",
      subtitle: "Up to 10% off Voucher",
    },
    {
      id: 3,
      img: iphoneImage,
      title: "iPhone 14 Series",
      subtitle: "Up to 10% off Voucher",
    },
    {
      id: 4,
      img: iphoneImage,
      title: "iPhone 14 Pro",
      subtitle: "Up to 10% off Voucher",
    },
    {
      id: 5,
      img: iphoneImage,
      title: "iPhone 14 Series",
      subtitle: "Up to 10% off Voucher",
    },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [bannerData.length]);

  const SidebarMenuItem = ({ label, children, position }) => (
    <li className="cursor-pointer relative group">
      <div
        className="flex w-2/3 lg:w-full justify-between items-center hover:text-[#DB4444] transition"
        aria-label={`${label} menu`}
      >
        <span>{label}</span>
        <img src={DropDown} alt={`${label} toggle`} className="w-6 h-6" />
      </div>
      {/* Dropdown will appear on hover */}
      <ul
        className={`w-36 sm:w-40 absolute ${
          position === "right"
            ? "left-full -ml-24 md:-ml-[6.5rem] lg:ml-0"
            : "right-full mr-2"
        } -mt-4 bg-transparent shadow-lg rounded-md p-4 space-y-2 text-sm border border-gray-200 z-50 group-hover:block hidden`}
      >
        {/* Background layer with blur effect */}
        <div className="absolute inset-0 backdrop-blur-[150px] bg-[#000000AA] rounded-md"></div>

        {/* Text content (not affected by the blur) */}
        <div className="relative z-10 text-slate-200">
          {children && (
            <div>
              {children.map((item, index) => (
                <div
                  key={index}
                  className="hover:text-[#DB4444] cursor-pointer transition py-2"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </ul>
    </li>
  );

  const Banner = ({ banner }) => (
    <div className="bg-black text-white h-auto lg:h-[344px] max-w-full lg:max-w-[892px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">
      {/* Text Section */}
      <div className="mt-6 md:mt-14 md:ml-16 mb-5 text-center md:text-left">
        <div className="flex items-center gap-6 justify-center md:justify-start">
          <img src={appleLogo} alt="Apple" className="w-10 h-12 mb-4" />
          <h2 className="text-base font-normal">{banner.title}</h2>
        </div>
        <p className="font-inter text-lg sm:text-[36px] leading-[40px] font-semibold mb-[22px] max-w-[311px] mx-auto md:mx-0">
          {banner.subtitle}
        </p>
        <Link
          to="/"
          className="text-base font-medium hover:text-gray-200 transition"
        >
          Shop Now
          <img src={RightArrow} className="w-6 h-6 inline ml-2" alt="Arrow" />
        </Link>
      </div>
      {/* Image Section */}
      <div className="flex justify-center md:justify-end w-full md:w-auto">
        <img
          src={banner.img}
          alt={banner.title}
          className="object-contain w-[250px] h-[250px] sm:w-[400px] sm:h-[300px]"
        />
      </div>
    </div>
  );

  return (
    <section className="mx-auto max-w-[320px] md:max-w-screen-sm lg:max-w-[930px] xl:max-w-screen-xl px-4 sm:px-6 lg:px-0 xl:px-8 py-6 sm:py-10">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
        {/* Sidebar */}
        <aside className="w-full lg:w-[20%] bg-white mb-8 md:mb-0 lg:mr-4">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 text-base font-normal">
            <SidebarMenuItem label="Women's Fashion" position="right">
              {["Dresses", "Tops & T-Shirts", "Skirts", "Accessories"].map(
                (item) => (
                  <li
                    key={item}
                    className="hover:text-[#DB4444] cursor-pointer transition"
                  >
                    {item}
                  </li>
                )
              )}
            </SidebarMenuItem>
            <SidebarMenuItem label="Men's Fashion" position="right">
              {["Shirts", "Pants", "Jackets", "Accessories"].map((item) => (
                <li
                  key={item}
                  className="hover:text-[#DB4444] cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </SidebarMenuItem>
            {[
              "Electronics",
              "Home & Lifestyle",
              "Medicine",
              "Sports & Outdoor",
              "Baby's & Toys",
              "Groceries & Pets",
              "Health & Beauty",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-[#DB4444] cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-[1px] h-[384px] bg-gray-300 mx-4 relative -top-10"></div>

        {/* Banner Section */}
        <div className="flex-1">
          <Banner banner={bannerData[currentBanner]} />
          {/* Navigation Dots */}
          <div className="flex justify-between -mt-10 mx-auto w-28">
            {bannerData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2 lg:w-3 h-2 lg:h-3 rounded-full ${
                  currentBanner === index
                    ? "bg-[#DB4444] border-white w-3 lg:w-[14px] h-3 lg:h-[14px]"
                    : "bg-gray-400"
                }`}
                aria-label={`Select banner ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
