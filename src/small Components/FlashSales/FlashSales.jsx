import React, { useState, useEffect } from "react";
import LeftArrow from "../../assets/icons/Fill With Left Arrow.png";
import RightArrow from "../../assets/icons/Fill with Right Arrow.png";
import ProductCard from "../ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";

const FlashSales = () => {
  const [countdown, setCountdown] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4;
  const navigate = useNavigate();

  // Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const { days, hours, minutes, seconds } = prev;

        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        if (minutes > 0) return { ...prev, minutes: minutes - 1, seconds: 59 };
        if (hours > 0)
          return { ...prev, hours: hours - 1, minutes: 59, seconds: 59 };
        if (days > 0)
          return { days: days - 1, hours: 23, minutes: 59, seconds: 59 };

        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetching data from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        const data = await response.json();

        if (!data || !Array.isArray(data.data)) {
          throw new Error("Data format is incorrect");
        }

        // Sort the products by 'updatedAt' field (assuming 'updatedAt' exists)
        const sortedProducts = data.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        // Get the newest 8 products based on updatedAt
        setProducts(sortedProducts.slice(0, 8)); // Only the first 8 newest products
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getVisibleProducts = () => {
    const start = currentIndex;
    const end = (currentIndex + visibleCount) % products.length;
    return start < end
      ? products.slice(start, end)
      : [...products.slice(start), ...products.slice(0, end)];
  };

  const handleViewAll = () => {
    navigate("/products", {
      state: {
        productsArray: products,
        headingText: "Flash Sales Products",
      },
    });
  };

  const visibleProducts = getVisibleProducts();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#DB4444] border-solid mx-auto"></div>
          <p className="text-lg font-semibold text-[#DB4444] mt-4">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-xl font-medium text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#DB4444] text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-20 mb-16 py-12 mx-auto max-w-[18rem] sm:max-w-2xl md:max-w-screen-sm xl:max-w-[1170px] lg:max-w-4xl">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-start sm:items-center mb-8 flex-col sm:flex-row">
        <div className="flex items-start xl:items-end gap-8 flex-col xl:flex-row">
          <div>
            <div className="flex items-center gap-3 pb-3">
              <span className="block rounded w-5 h-10 bg-red-500"></span>
              <h2 className="text-red-500 text-base font-semibold">Today’s</h2>
            </div>
            <h2 className="text-2xl lg:text-4xl font-semibold">Flash Sales</h2>
          </div>
          <div className="flex items-end space-x-2 md:space-x-4">
            {Object.entries(countdown).map(([label, value], index) => (
              <React.Fragment key={label}>
                <div className="text-center">
                  <div className="text-xs md:text-[12px] leading-[18px] font-medium">
                    {label}
                  </div>
                  <div className="text-xl md:text-[32px] leading-[30px] font-bold">
                    {value.toString().padStart(2, "0")}
                  </div>
                </div>
                {index < 3 && (
                  <span className="text-red-500 text-xl font-bold">:</span>
                )}
              </React.Fragment>
            ))}
          </div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="variant"
            componentName="FlashSalesProducts"
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleViewAll}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default FlashSales;
