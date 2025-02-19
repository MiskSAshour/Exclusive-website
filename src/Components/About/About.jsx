import Ladies from "../../assets/images/LadiesImage.png";
import Moneybag from "../../assets/icons/Icon-Moneybag.png";
import Moneybag_black from "../../assets/icons/Icon-Moneybag_black.png";
import Shoppingbag from "../../assets/icons/Icon-Shopping bag.png";
import Shoppingbag_black from "../../assets/icons/Icon-Shopping bag_black.png";
import Shop from "../../assets/icons/icon_shop2.png";
import Shop_black from "../../assets/icons/icon_shop-black.png";
import sale from "../../assets/icons/Icon-Sale.png";
import sale_black from "../../assets/icons/Icon-Sale-black.png";
import TeamSlider from "../../small Components/CustomSlider/CustomSlider";
import Services from "../../small Components/Services/Services";

export default function About() {
  const cardData = [
    {
      id: 1,
      icon: Shop,
      hoverIcon: Shop_black,
      iconDescription: "Shop",
      value: "10.5k",
      description: "Sellers active our site",
    },
    {
      id: 2,
      icon: sale,
      hoverIcon: sale_black,
      iconDescription: "sale",
      value: "33k",
      description: "Monthly Product Sale",
    },
    {
      id: 3,
      icon: Shoppingbag,
      hoverIcon: Shoppingbag_black,
      iconDescription: "Shopping bag",
      value: "45.5k",
      description: "Customer active in our site",
    },
    {
      id: 4,
      icon: Moneybag,
      hoverIcon: Moneybag_black,
      iconDescription: "Money bag",
      value: "25k",
      description: "Annual gross sale in our site",
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Our Story Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between space-y-8 md:space-y-0">
        <div className="flex-1 pl-9 sm:pl-[7.2rem] pr-5 sm:pr-[7.6rem] sm:max-w-3xl lg:pl-[4.5rem] lg:pr-10 xl:pl-24 xl:pr-20">
          <h2 className="font-inter text-[54px] font-semibold leading-[64px] tracking-wider mb-10 lg:font-medium">
            Our Story
          </h2>
          <p className="font-poppins text-base leading-7 font-normal mb-6">
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data, and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 million
            customers across the region.
          </p>
          <p className="font-poppins text-base leading-7 font-normal mb-6 lg:mb-0">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast rate. Exclusive offers a diverse assortment in categories
            ranging from consumer goods to electronics.
          </p>
        </div>
        <div className="flex-1">
          <img
            src={Ladies}
            alt="Shopping"
            className="w-full h-auto object-cover rounded"
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="flex flex-wrap gap-6 justify-center w-10/12 mx-auto my-36">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="group w-full max-w-[270px] flex flex-col items-center justify-center bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] border rounded-md text-center px-5 py-10 transform transition-all duration-300 hover:bg-red-500 hover:text-white"
          >
            <div className="flex items-center justify-center w-20 h-20 border-8 border-[#C1C0C1] rounded-full bg-black transition-all duration-300 group-hover:bg-white">
              {/* Dynamically render the correct icon based on hover state */}
              <img
                src={card.icon}
                alt={card.iconDescription}
                className="w-10 h-10 group-hover:hidden"
              />
              <img
                src={card.hoverIcon}
                alt={`${card.iconDescription} hover`}
                className="w-10 h-10 hidden group-hover:block"
              />
            </div>

            <p className="text-[32px] leading-[30px] font-bold mt-6">
              {card.value}
            </p>

            <p className="text-base font-normal mt-2">{card.description}</p>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <TeamSlider />

      {/* Services Section */}
      <Services />
    </div>
  );
}
