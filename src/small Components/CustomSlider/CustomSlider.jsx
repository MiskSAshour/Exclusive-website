import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tomCruise from "../../assets/images/Tom Cruise.png";
import emmaWatson from "../../assets/images/Emma Watson.png";
import willSmith from "../../assets/images/Will Smith.png";
import Instagram from "../../assets/icons/icon-instagram-black.png";
import Twitter from "../../assets/icons/Icon-Twitter-black.png";
import Linkedin from "../../assets/icons/Icon-Linkedin-black.png";
import { Link } from "react-router-dom";
import "./CustomSlider.module.css";

const teamMembers = [
  {
    id: 1,
    image: tomCruise,
    name: "Tom Cruise",
    title: "Founder & Chairman",
    socials: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 2,
    image: emmaWatson,
    name: "Emma Watson",
    title: "Managing Director",
    socials: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 3,
    image: willSmith,
    name: "Will Smith",
    title: "Product Designer",
    socials: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
];

export default function TeamSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (current, next) => {
      setActiveIndex(next); // Set active dot index before slide change
    },
    appendDots: (dots) => (
      <div style={{ bottom: "-80px" }}>
        <ul style={{ margin: "40px 0" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "12px",
          height: "12px",
          backgroundColor: i === activeIndex ? "#DB4444" : "#ccc", // Compare with activeIndex
          borderRadius: "50%",
          display: "inline-block",
          margin: "0 5px", // Space between dots
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="mb-40 py-10 max-w-screen-xl mx-auto w-11/12">
      <Slider {...settings}>
        {teamMembers.map((member) => (
          <div key={member.id} className="text-left">
            {/* Image */}
            <img
              src={member.image}
              alt={member.name}
              className="w-[300px] h-[350px] lg:w-[370px] lg:h-[430px] object-cover mx-auto mb-4 rounded-md"
            />

            <div className="w-fit ml-12 xl:ml-7">
              {/* Name */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-1 w-fit">
                {member.name}
              </h3>

              {/* Title */}
              <p className="text-lg text-gray-500 mb-3 w-fit">{member.title}</p>

              {/* Social Icons */}
              <div className="flex gap-4">
                <Link
                  to={member.socials.twitter}
                  target="_blank"
                  aria-label="Twitter"
                >
                  <img src={Twitter} alt="Twitter" className="w-6 h-6" />
                </Link>
                <Link
                  to={member.socials.instagram}
                  target="_blank"
                  aria-label="Instagram"
                >
                  <img src={Instagram} alt="Instagram" className="w-6 h-6" />
                </Link>
                <Link
                  to={member.socials.linkedin}
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <img src={Linkedin} alt="LinkedIn" className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
