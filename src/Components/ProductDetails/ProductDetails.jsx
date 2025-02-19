import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import heart from "../../assets/icons/heart small.png";
import redHeart from "../../assets/icons/red heart.png";
import delivery from "../../assets/icons/icon-delivery.png";
import returnIcon from "../../assets/icons/Icon-return.png";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import ProductCard from "../../small Components/ProductCard/ProductCard";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { addToWishlist, wishlist } = useContext(CartContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const isWishlisted = product
    ? wishlist.some((item) => item.id === product.id)
    : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products/${productId}`
        );
        setProduct(response.data.data);
        fetchRelatedProducts(response.data.data.category.name);
      } catch (err) {
        console.error(
          "API Error:",
          err.response ? err.response.data : err.message
        );
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const fetchRelatedProducts = async (categoryName) => {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      console.log(response);
      setRelatedProducts(
        response.data.data
          .filter(
            (p) => p.category.name === categoryName // Use categoryName for comparison
          )
          .slice(0, 4) // Limit to 4 related products
      ); // Exclude the current product
    } catch (err) {
      console.error("Error fetching related products:", err);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    const updatedProduct = { ...product, userQuantity: newQuantity };
    setProduct(updatedProduct);
    localStorage.setItem(
      "CartData",
      JSON.stringify({ cart: [{ ...updatedProduct }] })
    );
  };

  const handleWishlist = () => {
    if (!product || !product.id) return; // Ensure valid product

    if (isWishlisted) {
      // Remove from wishlist if it's already added
      addToWishlist(product, false); // Assuming addToWishlist can accept a second argument to remove the item
    } else {
      // Add to wishlist if it's not already added
      addToWishlist(product, true); // Assuming addToWishlist adds the item
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("CartData"))?.cart || [];

    const updatedProduct = {
      ...product,
      userQuantity: product.userQuantity || 1,
    };

    const existingProductIndex = cart.findIndex(
      (item) => item.productId === product.productId
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].userQuantity += updatedProduct.userQuantity;
    } else {
      cart.push(updatedProduct);
    }

    localStorage.setItem("CartData", JSON.stringify({ cart }));

    // Show success modal
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000); // Hide modal after 3 seconds
  };

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

  const renderStars = () => {
    const fullStars = Math.floor(product.ratingsAverage);
    const halfStar = product.ratingsAverage % 1 !== 0;

    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <span key={index} className="text-yellow-400 fas fa-star"></span>
        ))}
        {halfStar && (
          <span className="relative">
            <span className="fas fa-star text-gray-300 absolute inset-y-1"></span>
            <span className="fas fa-star-half-alt text-yellow-400 relative"></span>
          </span>
        )}
        {Array.from({ length: 5 - fullStars - (halfStar ? 1 : 0) }).map(
          (_, index) => (
            <span key={index} className="text-gray-300 fas fa-star"></span>
          )
        )}
      </>
    );
  };

  return (
    <div className="mx-auto mb-16 py-12 max-w-[350px] sm:max-w-2xl md:max-w-screen-sm xl:max-w-[1210px] lg:max-w-[950px] px-4">
      <nav className="text-gray-500 text-sm my-20 flex items-center flex-wrap  w-full">
        <Link to="/" className="text-gray-400 hover:text-gray-600">
          Account
        </Link>
        <span className="mx-2">/</span>
        <Link
          to={`/category/${product.category?.slug}`}
          className="text-gray-400 hover:text-gray-600"
        >
          {product.category?.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-black">{product.title}</span>
      </nav>
      <div className="flex flex-col xl:flex-row justify-between gap-20 lg:gap-8  w-full">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-6 xl:gap-0">
          <div className="grid grid-cols-2 xl:grid-cols-1 gap-2 lg:gap-4 lg:w-[45%] xl:w-[170px]">
            {product.images?.slice(0, 4).map((img, index) => (
              <img
                key={index}
                src={img}
                alt="product-thumbnail"
                className=" md:w-full h-[200px] lg:h-full xl:h-[138px] object-contain xl:object-cover rounded cursor-pointer"
              />
            ))}
          </div>
          <div className="w-[270px] h-[400px] lg:w-[450px] xl:w-[500px] lg:h-[600px] bg-transparent rounded flex justify-center items-center">
            <img
              src={product.imageCover}
              alt={product.title}
              className="object-cover bg-gray-300 h-full"
            />
          </div>
        </div>
        <div className="xl:w-[400px] sm:max-w-full sm:w-full">
          <h1 className="font-Inter text-[24px] leading-[24px] font-semibold tracking-wide">
            {product.title}
          </h1>
          <div className="flex items-baseline mt-4">
            <div className="flex items-center gap-2">
              {renderStars()}
              <p className="text-gray-500 text-sm font-semibold ml-2">
                ({product.ratingsQuantity} reviews)
              </p>
            </div>
          </div>
          <p className="font-Inter text-[24px] mt-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm mt-6 xl:max-w-[373px] max-h-[105px] overflow-auto border-b border-gray-300 pb-6">
            {product.description}
          </p>

          <p className="font-Inter text-[20px] my-6">Colores:</p>

          <div className=" lg:flex justify-between items-center xl:inline">
            <div className="flex items-center xl:mt-4 sm:flex-wrap sm:gap-4">
              <label className="mr-6 text-[20px] font-inter font-normal">
                Size:
              </label>
              <div className="flex space-x-3">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-8 h-8 flex items-center justify-center rounded border-2
                    ${
                      selectedSize === size
                        ? "bg-[#DB4444] text-white border-[#DB4444]"
                        : "border-gray-400 text-black"
                    }
                    transition duration-200`}
                  >
                    <span className="font-poppins text-sm">{size}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex mt-6 lg:mt-0 xl:mt-6 justify-between items-start xl:items-center flex-col md:flex-row lg:w-3/6 xl:w-full">
              <div className="md:w-[159px] h-11 flex justify-around items-center rounded border border-black w-full">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      Math.max(1, (product?.userQuantity ?? 1) - 1)
                    )
                  }
                  className="w-full h-full text-center text-2xl font-normal hover:bg-[#DB4444] hover:text-white transition duration-200"
                >
                  -
                </button>
                <input
                  type="number"
                  value={product?.userQuantity ?? 1}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10) || 1;
                    handleQuantityChange(Math.max(1, value));
                  }}
                  className="w-20 h-full border-x border-black text-center text-lg"
                />
                <button
                  onClick={() =>
                    handleQuantityChange((product?.userQuantity ?? 1) + 1)
                  }
                  className="w-full h-full text-center text-2xl font-normal hover:bg-[#DB4444] hover:text-white transition duration-200"
                >
                  +
                </button>
              </div>
              <div className="flex items-center justify-between mt-4 lg:mt-0 w-full md:w-[57%] xl:w-fit">
                <button
                  className="bg-[#DB4444] text-white text-base font-medium py-[10px] px-12 font-poppins rounded mr-4"
                  onClick={handleAddToCart}
                >
                  Buy Now
                </button>
                <button
                  onClick={handleWishlist}
                  className={`w-10 h-10 flex items-center justify-center rounded border-2 border-black ${
                    isWishlisted ? "border-2 border-red-500" : ""
                  }`}
                >
                  <img
                    src={isWishlisted ? redHeart : heart}
                    alt="wishlist"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10 border-[1px] border-black/50 py-6">
            <p className="flex items-center gap-4 font-poppins font-medium text-xs pl-4 underline">
              <img src={delivery} className="w-10 h-10" alt="delivery Icon" />
              <div>
                <strong className="text-base">Free Delivery</strong>
                <br />
                Enter your postal code for Delivery Availability
              </div>
            </p>
            <hr className="w-full h-[1px] bg-black my-4" />
            <p className="flex items-center gap-4 font-poppins font-medium text-xs pl-4">
              <img src={returnIcon} className="w-10 h-10" alt="return Icon" />
              <div>
                <strong className="text-base">Return Delivery</strong>
                <br />
                Free 30 Days Delivery Returns. Details
              </div>
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-36">
        <div className="flex items-center gap-3 pb-3">
          <span className="block rounded w-5 h-10 bg-red-500"></span>
          <h2 className="text-red-500 text-base font-semibold">Related Item</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="variant" />
          ))}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <p className="text-green-600 font-semibold">
              Product added to cart successfully!
            </p>
            <button
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => setShowSuccessModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
