import React from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../small Components/ProductCard/ProductCard";

const AllProductsPage = () => {
  const location = useLocation();
  const { headingText, productsArray } = location.state || {}; // Get the heading and products passed via state

  if (!productsArray || productsArray.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-medium text-red-600">
          No products available.
        </p>
      </div>
    );
  }

  return (
    <section className="pb-28 lg:pb-[140px] mx-auto max-w-[18rem] sm:max-w-2xl xl:max-w-[1170px] lg:max-w-4xl">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
          {headingText} {/* Display dynamic heading */}
        </h2>
      </div>

      {/* Grid of Products */}
      <div
        id="product-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 place-items-center"
      >
        {productsArray.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="variant"
            componentName="AllProductsPage"
          />
        ))}
      </div>

      {/* Optional Pagination or Sorting Controls */}
      <div className="flex justify-center items-center mt-10">
        <button className="bg-[#DB4444] text-white py-2 px-6 rounded-md hover:bg-red-700 transition duration-300">
          Load More
        </button>
      </div>
    </section>
  );
};

export default AllProductsPage;
