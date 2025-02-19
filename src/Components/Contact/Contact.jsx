import { useState } from "react";
import phone from "../../assets/icons/phone.png";
import mail from "../../assets/icons/mail.png";
import styles from "./Contact.module.css";

const CustomInput = ({ id, label, type = "text" }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-full sm:w-1/3 md:w-[49%] lg:w-[31.5%] relative">
      {/* Label with red asterisk */}
      <label
        htmlFor={id}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-base font-normal font-poppins transition-all duration-200 ${
          value || isFocused ? "text-transparent" : "text-neutral-400"
        }`}
      >
        {label + " "}
        <span
          className={`${
            value || isFocused ? "text-transparent" : "text-red-500"
          }`}
        >
          *
        </span>
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className="w-full sm:w-1/3 md:w-full flex-1 py-[13px] pl-4 border text-base font-normal font-poppins bg-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder=" "
      />
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="flex flex-col xl:flex-row justify-center xl:justify-between mt-20 mb-20 gap-8 max-w-[1250px] mx-auto px-4">
      {/* Contact Info Section */}
      <div className="mx-auto flex-1 lg:min-w-[280px] lg:w-11/12 xl:max-w-[370px] rounded-lg bg-white shadow-custom">
        <div className="py-10 px-9 flex flex-col md:flex-row xl:flex-col gap-8 xl:w-[340px]">
          {/* Call To Us Section */}
          <div className="w-full md:w-1/2 xl:w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#DB4444] flex justify-center items-center rounded-full">
                <img src={phone} alt="phone" className="w-5 h-5" />
              </div>
              <h2 className="font-poppins text-[16px] font-medium leading-[24px]">
                Call To Us
              </h2>
            </div>
            <p className={`${styles.contactText} mb-4`}>
              We are available 24/7, 7 days a week.
            </p>
            <p className={`${styles.contactText} font-bold`}>
              Phone: +8801811112222
            </p>
          </div>

          {/* Separator */}
          <div className="relative -top-3 hidden md:block xl:hidden w-[1px] md:h-[180px] bg-black mx-auto"></div>
          <hr className="block md:hidden xl:block xl:w-full bg-black" />

          {/* Write To Us Section */}
          <div className="w-full md:w-1/2 xl:w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#DB4444] flex justify-center items-center rounded-full">
                <img src={mail} alt="mail" className="w-5 h-3.5" />
              </div>
              <h2 className="font-poppins text-[16px] font-medium leading-[24px]">
                Write To Us
              </h2>
            </div>
            <p className={`${styles.contactText} mb-4`}>
              Fill out our form and we will contact you within 24 hours.
            </p>
            <ul className="space-y-2">
              <li className={styles.contactText}>
                Emails: customer@exclusive.com
              </li>
              <li className={styles.contactText}>
                Emails: support@exclusive.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="lg:mx-auto flex-1 lg:w-11/12 xl:w-auto rounded-lg bg-white shadow-custom px-4 md:px-8 py-10">
        <form className="flex flex-col space-y-6">
          <div className="flex flex-wrap justify-between gap-y-4 lg:gap-y-0">
            <CustomInput id="name" label="Your Name" />
            <CustomInput id="email" label="Your Email" type="email" />
            <CustomInput id="phone" label="Your Phone" type="tel" />
          </div>
          <textarea
            placeholder="Your Message"
            className="p-3 border w-full text-base font-normal font-poppins bg-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 h-52 resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full sm:w-[215px] ml-auto p-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition duration-300 mt-8"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
