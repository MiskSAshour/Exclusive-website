import { CartContext } from "../../Context/CartContext";
import heart from "../../assets/icons/heart small.png"; // Gray heart
import redHeart from "../../assets/icons/red heart.png"; // Red heart
import eye from "../../assets/icons/Quick View.png"; // Eye icon
import trashIcon from "../../assets/icons/trash.png"; // Trash icon for deleting
import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({
  product,
  variant = "default",
  componentName,
  onRemove = () => {}, // Default to an empty function if not provided
  addToCartFromWishlist, // Ensure this function is passed correctly
}) => {
  if (!product) {
    return <div>Product not available</div>; // Fallback UI for when the product is not provided
  }

  // Always call useContext unconditionally
  const { addToCart, addToWishlist, wishlist } = useContext(CartContext);
  const navigate = useNavigate();

  // Check if the product is in the wishlist
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  // Toggle Wishlist
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

  const renderStars = () => {
    if (!product || typeof product.ratingsAverage !== "number") return null; // Ensure product.ratingsAverage exists and is a number
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

  const handleAddToCart = () => {
    addToCart(componentName, product);
  };

  const handleAddToCartFromWishlist = () => {
    addToCartFromWishlist(product);
  };

  const handleProductDetails = () => {
    navigate(`/productdetails/${encodeURIComponent(product.id)}`);
  };

  const renderWishlistAndDetailsIcons = () => (
    <div className="absolute top-4 right-4 flex flex-col items-center gap-2 opacity-100 transition-opacity z-10">
      {componentName === "JustForYou" ? (
        // Render only the Product Details Icon for JustForYou
        <button
          onClick={handleProductDetails}
          className="w-[34px] h-[34px] flex items-center justify-center rounded-full"
        >
          <img src={eye} alt="details" className="w-6 h-6" />
        </button>
      ) : (
        <>
          {/* Render Wishlist Icon for other components */}
          <button
            onClick={handleWishlist}
            className={`w-[34px] h-[34px] flex items-center justify-center rounded-full ${
              isWishlisted ? "border-2 border-red-500" : ""
            }`}
          >
            <img
              src={isWishlisted ? redHeart : heart}
              alt="wishlist"
              className="w-6 h-6"
            />
          </button>

          {/* Product Details Icon (always visible) */}
          <button
            onClick={handleProductDetails}
            className="w-[34px] h-[34px] flex items-center justify-center rounded-full"
          >
            <img src={eye} alt="details" className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );

  const renderDefaultDesign = () => (
    <div className="relative rounded w-[270px] h-[350px] group bg-white">
      {product.isNew && (
        <span className="absolute top-4 left-4 bg-[#00C853] text-white text-sm font-medium py-1 px-3 rounded z-10">
          NEW
        </span>
      )}

      {componentName === "Wishlist" ? (
        <div className="absolute top-4 right-4 flex flex-col items-center gap-2 opacity-100 transition-opacity z-10">
          {/* Trash Icon */}
          <button
            onClick={() => onRemove(product)}
            className={`w-[34px] h-[34px] flex items-center justify-center rounded-full ${
              isWishlisted ? "border-2 border-black" : ""
            }`}
          >
            <img src={trashIcon} alt="Delete icon" className="w-6 h-6" />
          </button>
        </div>
      ) : (
        renderWishlistAndDetailsIcons()
      )}

      <div className="w-[270px] h-[250px] border border-black bg-transparent flex justify-center items-center relative overflow-hidden rounded-md">
        <img
          src={product.imageCover}
          alt={product.title}
          className="h-[200px] w-[200px] object-cover transform transition-transform duration-500 group-hover:-translate-y-5"
        />

        {/* Always show the Add To Cart button in the Wishlist */}
        {componentName === "Wishlist" ? (
          <button
            className="w-full absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black text-white text-base font-medium py-2 rounded opacity-100"
            onClick={handleAddToCartFromWishlist}
          >
            Add To Cart
          </button>
        ) : (
          // Show Add To Cart button on hover for other components
          <button
            className="w-full absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black text-white text-base font-medium py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        )}
      </div>

      <h3
        className={`font-poppins text-base font-medium mt-4 ${styles.truncate}`}
      >
        {product.title}
      </h3>

      <div className="flex items-baseline">
        <p className="text-red-500 font-poppins text-base font-medium mt-2 mr-2">
          ${product.price}
        </p>
        {componentName !== "Wishlist" ? (
          <div className="flex items-center gap-1">
            {renderStars()}
            <p className="text-gray-500 text-sm font-semibold font-poppins ml-2">
              ({product.quantity})
            </p>
          </div>
        ) : (
          ""
        )}
      </div>

      {product.colors && (
        <div className="flex justify-start gap-2 mt-2">
          {product.colors.map((color, index) => (
            <span
              key={index}
              className={`flex items-center justify-center ${
                index === 0 ? "w-5 h-5 border border-black rounded-full" : ""
              }`}
            >
              <span
                className={`${
                  index === 0 ? "w-3 h-3" : "w-5 h-5"
                } rounded-full`}
                style={{ backgroundColor: color }}
              ></span>
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const renderVariantDesign = () => (
    <div className="relative rounded w-[270px] h-[350px] group bg-white">
      {componentName === "FlashSalesProducts" && product.price && (
        <div className="absolute top-3 left-3 bg-[#DB4444] text-white font-poppins text-[12px] leading-[18px] font-normal py-[6px] px-3 rounded z-10">
          <span className="w-[31px] h-[18px]">-25%</span>
        </div>
      )}

      {renderWishlistAndDetailsIcons()}

      <div className="w-[270px] h-[250px] border border-black bg-transparent flex justify-center items-center relative overflow-hidden rounded-md">
        <img
          src={product.imageCover}
          alt={product.title}
          className="h-[200px] w-[200px] object-cover transform transition-transform duration-500 group-hover:-translate-y-5"
        />
        {componentName === "JustForYou" ? (
          <button
            className="w-full absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black text-white text-base font-medium py-2 rounded opacity-100"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        ) : (
          <button
            className="w-full absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black text-white text-base font-medium py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        )}
      </div>

      <h3
        className={`font-poppins text-base font-medium mt-4 ${styles.truncate}`}
      >
        {product.title}
      </h3>

      <div className="flex items-baseline mb-2">
        <p className="text-red-500 font-poppins text-base font-medium mt-2 mr-2">
          ${product.price}
        </p>
        <p className="text-gray-500 font-poppins text-sm font-medium line-through mt-2">
          {/* ${product.price - (product.price * product.discount) / 100} */}$
          {product.price - (product.price * 50) / 100}
        </p>
      </div>

      <div className="flex items-center gap-1">
        {renderStars()}
        <p className="text-gray-500 text-sm font-semibold font-poppins ml-2">
          ({product.quantity})
        </p>
      </div>
    </div>
  );

  return variant === "default" ? renderDefaultDesign() : renderVariantDesign();
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    imageCover: PropTypes.string.isRequired,
    ratingsAverage: PropTypes.number.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    reviews: PropTypes.number.isRequired,
    isNew: PropTypes.bool,
    colors: PropTypes.arrayOf(PropTypes.string),
    discount: PropTypes.string,
    category: PropTypes.string,
  }),
  variant: PropTypes.string,
  componentName: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
  handleAddToCartFromWishlist: PropTypes.func,
  addToCartFromWishlist: PropTypes.func,
};

export default ProductCard;
