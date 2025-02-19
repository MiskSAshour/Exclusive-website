import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";

// Function to shuffle an array randomly
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap
  }
  return shuffledArray;
};

const BestSellingProducts = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        const data = await response.json();

        if (!data || !Array.isArray(data.data)) {
          throw new Error("Data format is incorrect");
        }

        // Filter products with ratings greater than 4.6
        const filteredProducts = data.data.filter(
          (product) => product.ratingsAverage > 4.6
        );

        // Shuffle the products array
        const shuffledProducts = shuffleArray(filteredProducts);

        // Sort products by the 'sold' number in descending order (optional)
        const sortedProducts = shuffledProducts.sort((a, b) => b.sold - a.sold);

        setBestSellingProducts(sortedProducts);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellingProducts();
  }, []);

  const handleViewAll = () => {
    // Pass the bestSellingProducts array to the AllProductsPage via state and include the heading
    navigate("/products", {
      state: {
        productsArray: bestSellingProducts,
        headingText: "Best Selling Products",
      },
    });
  };

  const productsToDisplay = showAll
    ? bestSellingProducts
    : bestSellingProducts.slice(0, 4);

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
    <section className="pb-28 lg:pb-[140px] mx-auto max-w-[18rem] sm:max-w-2xl xl:max-w-[1170px] lg:max-w-4xl">
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div className="flex flex-col w-full sm:w-auto">
          <div className="flex items-center gap-3 pb-3">
            <span className="block rounded w-5 h-10 bg-[#DB4444]"></span>
            <h2 className="font-poppins font-semibold text-sm sm:text-base leading-5 text-[#DB4444]">
              This Month
            </h2>
          </div>
          <h2 className="font-inter text-2xl sm:text-3xl lg:text-4xl leading-tight font-semibold mb-4 sm:mb-6">
            Best Selling Products
          </h2>
        </div>
        <button
          onClick={handleViewAll}
          className="font-poppins text-base font-medium bg-[#DB4444] text-white px-12 py-4 rounded-md hover:bg-red-700 transition duration-300"
        >
          View All
        </button>
      </div>
      <div
        id="product-slider"
        className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 place-items-center"
      >
        {productsToDisplay.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="variant"
            componentName="BestSellingProducts"
          />
        ))}
      </div>
    </section>
  );
};

export default BestSellingProducts;
