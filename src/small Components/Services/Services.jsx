import delivery from "../../assets/icons/icon-delivery-w.png";
import CustomerService from "../../assets/icons/Icon-Customer service.png";
import secure from "../../assets/icons/Icon-secure.png";

export default function Services() {
  const ServicesData = [
    {
      id: 1,
      icon: delivery,
      iconDescription: "delivery",
      value: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      id: 2,
      icon: CustomerService,
      iconDescription: "Customer service",
      value: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      id: 3,
      icon: secure,
      iconDescription: "secure",
      value: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <>
      <section className="w-11/12 xl:w-full flex flex-wrap gap-0 gap-x-11 xl:gap-[88px] justify-center mx-auto mt-10 xl:mt-0 mb-10 lg:my-[140px]">
        {ServicesData.map((card) => (
          <div
            key={card.id}
            className="group w-full max-w-[262px] flex flex-col items-center justify-center text-center py-10 transform transition-all duration-300"
          >
            {/* Icon Container */}
            <div className="flex items-center justify-center w-20 h-20 border-[10px] border-[#C1C0C1] rounded-full bg-black transition-all duration-300 ">
              <img
                src={card.icon}
                alt={card.iconDescription}
                className="w-10 h-10"
              />
            </div>

            {/* Value */}
            <p className="text-xl font-semibold mt-6">{card.value}</p>

            {/* Description */}
            <p className="text-sm font-normal mt-2">{card.description}</p>
          </div>
        ))}
      </section>
    </>
  );
}
