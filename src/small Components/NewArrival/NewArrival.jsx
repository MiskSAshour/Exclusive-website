import React from "react";
import PlayStation5 from "../../assets/images/PlayStation5.png";
import WomenCollectionImage from "../../assets/images/attractive-woman-wearing-hat-posing-black-background 1.png";
import SpeakersImage from "../../assets/images/69-694768_amazon-echo-png-clipart-transparent-amazon-echo-png 1.png";
import Perfume from "../../assets/images/Gucci.png";
import ArrivalCard from "./ArrivalCard/ArrivalCard";
import styles from "./NewArrival.module.css";

const featuredProducts = [
  {
    id: 1,
    name: "PlayStation 5",
    description: "Black and White version of the PS5 coming out on sale.",
    img: PlayStation5,
    size: "large",
    backgroundColor: "#000000",
  },
  {
    id: 2,
    name: "Women's Collections",
    description: "Featured woman collections that give you another vibe.",
    img: WomenCollectionImage,
    size: "secondSize",
    backgroundColor: "#0D0D0D",
  },
  {
    id: 3,
    name: "Speakers",
    description: "Amazon wireless speakers",
    img: SpeakersImage,
    backgroundColor: "#1a1a1a",
  },
  {
    id: 4,
    name: "Perfume",
    description: "GUCCI INTENSE OUD EDP",
    img: Perfume,
    backgroundColor: "#2a2a2a",
  },
];

const NewArrival = () => {
  return (
    <section
      className={`${styles.container} pb-10 lg:pb-[140px] mx-auto max-w-[18rem] sm:max-w-2xl xl:max-w-[1170px] lg:max-w-4xl`}
    >
      <div className="flex items-center w-fit gap-3 pb-5">
        <span className="block rounded w-5 h-10 bg-[#DB4444]"></span>
        <h2 className="font-poppins font-semibold text-base leading-5 text-[#DB4444]">
          Featured
        </h2>
      </div>
      <h2 className="font-inter text-[36px] leading-[48px] tracking-[0.03em] font-semibold mb-[60px]">
        New Arrival
      </h2>
      <div
        className="grid md:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-5 lg:gap-6 xl:gap-[30px]"
        style={{ gridTemplateRows: "repeat(2, auto)" }}
      >
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className={
              index === 0
                ? "col-span-1 sm:col-span-2 row-span-2 h-[350px] sm:h-full xl:w-[570px]"
                : index === 1
                ? "col-span-1 sm:col-span-2 row-span-1 h-full xl:h-72"
                : "h-52 sm:h-64 xl:h-72"
            }
          >
            <ArrivalCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrival;
