import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import LeftArrow from "../../assets/icons/Fill With Left Arrow.png";
import RightArrow from "../../assets/icons/Fill with Right Arrow.png";
import { useNavigate } from "react-router-dom";

const ExploreProducts = () => {
  const [productIndex, setProductIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(8);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        const data = await response.json();
        setProducts(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 640) {
        setVisibleCount(2);
      } else if (window.innerWidth <= 786) {
        setVisibleCount(4);
      } else if (window.innerWidth <= 1024) {
        setVisibleCount(6);
      } else {
        setVisibleCount(8);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const handlePrev = () => {
    setProductIndex(
      (prev) => (prev - visibleCount + products.length) % products.length
    );
  };

  const handleNext = () => {
    setProductIndex((prev) => (prev + visibleCount) % products.length);
  };

  const getVisibleProducts = (products, startIndex, count) => {
    const endIndex = startIndex + count;
    const visibleProducts = products.slice(startIndex, endIndex);
    return visibleProducts.length < count
      ? [
          ...visibleProducts,
          ...products.slice(0, count - visibleProducts.length),
        ]
      : visibleProducts;
  };

  const visibleProducts = getVisibleProducts(
    products,
    productIndex,
    visibleCount
  );

  const handleViewAll = () => {
    // Pass the bestSellingProducts array to the AllProductsPage via state and include the heading
    navigate("/products", {
      state: {
        productsArray: products,
        headingText: "All Products",
      },
    });
  };

  // Loading and error message styling
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#DB4444] border-solid mx-auto"></div>
          <p className="text-lg font-semibold text-[#DB4444] mt-4">
            Loading Products...
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
    <section className="pb-10 lg:pb-[140px] mx-auto max-w-[18rem] sm:max-w-2xl xl:max-w-[1170px] lg:max-w-4xl">
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div className="flex flex-col w-full sm:w-auto">
          <div className="flex items-center gap-3 pb-3">
            <span className="block rounded w-5 h-10 bg-[#DB4444]"></span>
            <h2 className="font-poppins font-semibold text-sm sm:text-base leading-5 text-[#DB4444]">
              Our Products
            </h2>
          </div>
          <h2 className="font-inter text-2xl sm:text-3xl lg:text-4xl leading-tight font-semibold mb-4 sm:mb-6">
            Explore Our Products
          </h2>
        </div>
        <div className="flex justify-end items-center mt-4 sm:mt-0">
          <button
            onClick={handlePrev}
            className="text-gray-600 hover:text-black text-lg sm:text-xl lg:text-2xl"
          >
            <img src={LeftArrow} alt="Previous" className="h-8 sm:h-10 mr-2" />
          </button>
          <button
            onClick={handleNext}
            className="text-gray-600 hover:text-black text-lg sm:text-xl lg:text-2xl"
          >
            <img src={RightArrow} alt="Next" className="h-8 sm:h-10" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-12">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}
          >
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                componentName="ExploreProducts"
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleViewAll}
          className="font-poppins text-base font-medium bg-[#DB4444] text-white px-12 py-4 rounded-md hover:bg-red-700 transition duration-300"
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default ExploreProducts;
