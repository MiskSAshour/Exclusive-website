import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import musicSpeaker from "../../assets/images/music Speaker.png";

const Hero = ({ handleOrderPopup }) => {
  const HeroData = [
    {
      id: 1,
      img: musicSpeaker,
      subtitle: "Categories",
      title: "Enhance Your Music Experience",
    },
    {
      id: 2,
      img: musicSpeaker,
      subtitle: "Categories",
      title: "Enhance Your Music Experience",
    },
  ];

  // Countdown Timer State
  const [countdown, setCountdown] = useState({
    days: 5,
    hours: 23,
    minutes: 59,
    seconds: 35,
  });

  // Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: HeroData.length > 1,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    pauseOnFocus: true,
  };

  return (
    <div className="container mx-auto lg:px-8 pb-10 lg:pb-[71px]">
      <div className="bg-black text-white mx-auto max-w-[19.5rem] sm:max-w-2xl xl:max-w-[1170px] lg:max-w-4xl overflow-hidden">
        {HeroData.length > 1 ? (
          <Slider {...settings}>
            {HeroData.map((data) => (
              <HeroSlide
                key={data.id}
                data={data}
                countdown={countdown}
                handleOrderPopup={handleOrderPopup}
              />
            ))}
          </Slider>
        ) : (
          <HeroSlide
            data={HeroData[0]}
            countdown={countdown}
            handleOrderPopup={handleOrderPopup}
          />
        )}
      </div>
    </div>
  );
};

const HeroSlide = ({ data, countdown, handleOrderPopup }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center sm:h-auto lg:h-[500px] lg:ml-7 lg:mr-[60px] xl:ml-11 xl:mr-[84px]">
    {/* Text Section */}
    <div className="h-auto lg:h-[500px] flex flex-col justify-center px-4 sm:px-6 pr-7 pt-[69px] text-center lg:text-left">
      <h3 className="font-poppins text-[#00FF66] text-base font-semibold">
        {data.subtitle}
      </h3>
      <h2 className="font-inter text-[1.5rem] lg:text-[1.875rem] xl:text-[48px] leading-[1.2] sm:leading-[60px] my-8 sm:my-4 font-semibold">
        {data.title}
      </h2>
      {/* Countdown Timer */}
      <div className="flex flex-wrap gap-3 sm:gap-6 justify-center lg:justify-start mb-6">
        {["hours", "days", "minutes", "seconds"].map((unit, index) => (
          <div
            key={index}
            className="font-poppins text-black w-14 h-14 lg:w-[62px] lg:h-[62px] bg-white rounded-full flex flex-col items-center justify-center"
          >
            <span className="text-sm sm:text-base lg:text-lg font-semibold leading-none max-w-[21px] h-5 lg:h-6">
              {countdown[unit]}
            </span>
            <span className="text-[9px] sm:text-[10px] lg:text-[11px] leading-[12px] sm:leading-[14px] md:leading-[16px] font-normal text-center">
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </span>
          </div>
        ))}
      </div>
      {/* Button */}
      <button
        className="mx-auto lg:mx-0 mb-10 w-2/4 sm:w-44 bg-[#00FF66] text-[#fafafa] text-sm sm:text-base font-medium py-3 sm:py-4 px-6 sm:px-12 rounded hover:bg-green-600 transition"
        onClick={handleOrderPopup}
      >
        Buy Now!
      </button>
    </div>
    {/* Image Section */}
    <div className="flex justify-center items-center p-4 sm:pl-6 lg:pb-[45px] lg:px-4 lg:mr-11 h-2/5 lg:h-[420px] lg:w-[450px] xl:w-[600px] drop-shadow-[0_-10px_100px_rgba(255,255,255,0.1)]">
      <img
        src={data.img}
        alt={data.title}
        className="object-contain w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[586px] min-h-[250px] sm:min-h-[300px] max-h-[250px] lg:h-[330px] drop-shadow-[0_-15px_90px_rgba(255,255,255,0.23)]"
      />
    </div>
  </div>
);

export default Hero;
