import { useEffect, useState, useContext } from "react";
import ProductCard from "../../small Components/ProductCard/ProductCard";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";

export default function Wishlist() {
  const { wishlist: contextWishlist, addToCart } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);
  const [justForYou, setJustForYou] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load wishlist from context/localStorage initially
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("WishlistData")) || {
      wishlist: [],
    };
    setWishlist(storedWishlist.wishlist || []);
  }, [contextWishlist]);

  // Fetch products for "Just For You" section
  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        const products = response.data.data;

        // Select random items for "Just For You"
        const randomItems = products
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setJustForYou(randomItems);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, []);

  // Improved Loading State
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

  // Improved Error State
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 font-semibold text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Handle "Move All To Bag" button
  const handleMoveAllToBag = () => {
    wishlist.forEach((product) => addToCart("Wishlist", product)); // Add all items to the cart
    setWishlist([]); // Clear wishlist after moving items
    localStorage.setItem("WishlistData", JSON.stringify({ wishlist: [] }));
  };

  const handleAddToCartFromWishlist = (product) => {
    // Remove the product from the wishlist state
    const updatedWishlist = wishlist.filter((item) => item.id !== product.id);

    // Add the product to the cart
    addToCart("Wishlist", product); // This already handles cart update

    // Update the wishlist state
    setWishlist(updatedWishlist);

    // Update localStorage by saving the updated wishlist
    localStorage.setItem(
      "WishlistData",
      JSON.stringify({ wishlist: updatedWishlist })
    );
  };

  const handleRemoveFromWishlist = (product) => {
    // Remove the product from the wishlist state
    const updatedWishlist = wishlist.filter((item) => item.id !== product.id);

    // Update the wishlist state
    setWishlist(updatedWishlist);

    // Update localStorage by removing the item from stored wishlist
    localStorage.setItem(
      "WishlistData",
      JSON.stringify({ wishlist: updatedWishlist })
    );
  };

  return (
    <section className="mx-auto mt-20 mb-16 py-12 max-w-[18rem] sm:max-w-2xl md:max-w-screen-sm xl:max-w-[1170px] lg:max-w-4xl">
      {/* Wishlist Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[35px] mt-12">
          <h2 className="text-[20px] leading-[26px] font-normal font-poppins mb-4">
            Wishlist ({wishlist.length})
          </h2>
          {wishlist.length > 0 && (
            <button
              onClick={handleMoveAllToBag}
              className="py-4 px-12 border border-black text-black font-medium hover:bg-black hover:text-white transition"
            >
              Move All To Bag
            </button>
          )}
        </div>
        {wishlist.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-around lg:justify-start">
            {wishlist.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                componentName="Wishlist"
                onRemove={handleRemoveFromWishlist}
                addToCartFromWishlist={handleAddToCartFromWishlist}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Your wishlist is empty.</p>
        )}
      </div>

      {/* Just For You Section */}
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14">
          <div className="flex justify-between items-center mb-[35px] mt-12">
            <span className="block rounded w-5 h-10 bg-red-500"></span>
            <h2 className="text-[20px] leading-[26px] font-normal font-poppins ml-4">
              Just For You
            </h2>
          </div>
          <button className="py-4 px-12 border border-black text-black font-medium hover:bg-black hover:text-white transition">
            See All
          </button>
        </div>
        <div className="flex flex-wrap gap-6 justify-around">
          {justForYou.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              componentName="JustForYou"
              variant="varient"
              addToCartFromWishlist={handleAddToCartFromWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
