import React, { useState } from "react";

export default function SidebarMenu() {
  const [activeLink, setActiveLink] = useState("profile");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="w-64 p-4 text-sm font-poppins text-gray-600">
      {/* Manage My Account Section */}
      <div className="mb-6">
        <h3 className="text-black text-base font-bold mb-3">
          Manage My Account
        </h3>
        <ul className="space-y-2">
          <li>
            <a
              href="#profile"
              onClick={() => handleLinkClick("profile")}
              className={`${
                activeLink === "profile"
                  ? "text-[#DB4444] font-medium"
                  : "hover:text-black"
              }`}
            >
              My Profile
            </a>
          </li>
          <li>
            <a
              href="#address"
              onClick={() => handleLinkClick("address")}
              className={`${
                activeLink === "address"
                  ? "text-[#DB4444] font-medium"
                  : "hover:text-black"
              }`}
            >
              Address Book
            </a>
          </li>
          <li>
            <a
              href="#payment"
              onClick={() => handleLinkClick("payment")}
              className={`${
                activeLink === "payment"
                  ? "text-[#DB4444] font-medium"
                  : "hover:text-black"
              }`}
            >
              My Payment Options
            </a>
          </li>
        </ul>
      </div>

      {/* My Orders Section */}
      <div className="mb-6">
        <h3 className="text-black text-base font-bold mb-3">My Orders</h3>
        <ul className="space-y-2">
          <li>
            <a
              href="#returns"
              onClick={() => handleLinkClick("returns")}
              className={`${
                activeLink === "returns"
                  ? "text-[#DB4444] font-medium"
                  : "hover:text-black"
              }`}
            >
              My Returns
            </a>
          </li>
          <li>
            <a
              href="#cancellations"
              onClick={() => handleLinkClick("cancellations")}
              className={`${
                activeLink === "cancellations"
                  ? "text-[#DB4444] font-medium"
                  : "hover:text-black"
              }`}
            >
              My Cancellations
            </a>
          </li>
        </ul>
      </div>

      {/* My WishList Section */}
      <div>
        <h3 className="text-black text-base font-bold mb-3">My WishList</h3>
      </div>
    </div>
  );
}
