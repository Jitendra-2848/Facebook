import React, { useState, useCallback, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoHome, IoApps } from "react-icons/io5";
import { FaUserFriends, FaBell, FaFacebook } from "react-icons/fa";
import { MdOutlineOndemandVideo, MdGroups3 } from "react-icons/md";
import { LuShoppingCart, LuMessageCircleMore } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Store } from "../store/check";

const menuItems = [
  { id: "home", label: "Home", icon: <IoHome /> },
  { id: "friends", label: "Friends", icon: <FaUserFriends /> },
  { id: "videos", label: "Videos", icon: <MdOutlineOndemandVideo /> },
  { id: "market", label: "Marketplace", icon: <LuShoppingCart /> },
  { id: "groups", label: "Groups", icon: <MdGroups3 /> },
];

const actions = [
  { id: "apps", icon: <IoApps />, label: "Menu" },
  { id: "messages", icon: <LuMessageCircleMore />, label: "Messenger" },
  { id: "notifications", icon: <FaBell />, label: "Notifications" },
];

const NavItem = ({ id, icon, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`relative flex justify-center items-center w-12 h-12 rounded-md transition-all duration-150 ${
      isActive
        ? "text-blue-600"
        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
    }`}
  >
    <span className="text-2xl">{icon}</span>
    {isActive && (
      <span className="absolute bottom-[-6px] w-full h-[3px] bg-blue-600 rounded-t" />
    )}
  </button>
);

const IconButton = ({ icon, label }) => (
  <button
    aria-label={label}
    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
  >
    <span className="text-xl text-gray-800">{icon}</span>
  </button>
);

const Nav = () => {
  const [open, setopen] = useState(false);
  const { User_detail, logout } = Store();
  const Navigate = useNavigate();
  const [active, setActive] = useState("home");
  const handleClick = useCallback((id) => setActive(id), []);
  if (!User_detail || !User_detail.firstname) {
    return window.location.reload(); // or a loading spinner
  }
  return (
    <>
      {/* Top Navigation */}
      <nav className="w-full relative h-auto bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="flex items-center justify-between px-4 h-14 sm:min-h-16 max-w-screen-xl mx-auto">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-3">
            <a href="/" aria-label="Facebook Home">
              <FaFacebook className="text-blue-600 text-3xl sm:text-4xl" />
            </a>
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 h-10 w-48 focus-within:ring-1 focus-within:ring-blue-600">
              <IoIosSearch className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Search Facebook"
                className="bg-transparent pl-2 text-sm w-full outline-none"
              />
            </div>
          </div>

          {/* Middle: Desktop Menu (unchanged) */}
          <div className="hidden md:flex flex-1 justify-center gap-1">
            {menuItems.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                icon={item.icon}
                isActive={active === item.id}
                onClick={handleClick}
              />
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {actions.map((a) => (
              <IconButton key={a.id} icon={a.icon} label={a.label} />
            ))}

            {/* Profile/Avatar Initial - FIX APPLIED HERE */}
            <h1
              onClick={() => {
                setopen(!open);
              }}
              className="relative hover:cursor-pointer w-12 h-12 bg-gray-500 text-white rounded-full font-semibold flex items-center justify-center hover:opacity-90 transition"
            >
              {/* 💡 FIX: Conditional rendering to show <img> OR a letter */}
              {User_detail?.profile_pic ? (
                // PATH 1: Render the image if the URL exists
                <img
                  src={User_detail.profile_pic}
                  className="w-12 h-12 object-cover aspect-[1] rounded-full"
                  alt={
                    User_detail
                      ? `${User_detail.firstname}'s profile picture`
                      : "Default user profile picture"
                  }
                  // Optional: Handle errors if the image URL is broken
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                // PATH 2: Render the user initial as text inside the <h1>
                User_detail?.firstname?.charAt(0) || "?"
              )}

              <span className="absolute bottom-[-5px] text-md hover:hidden right-[-5px] text-black">
                <AiOutlinePlus />
              </span>
              {/* Removed the unnecessary <br /> tag */}
            </h1>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div className="absolute top-16 right-10">
          {open ? (
            <div className="w-60 bg-[#fbfbfb] shadow-md rounded-xl">
              <div className="flex items-center justify-evenly px-4 text-[12px] py-2">
                {/* 💡 FIX: Conditional rendering to show <img> OR a letter/initial DIV */}
                {User_detail?.profile_pic ? (
                  <img
                    src={User_detail.profile_pic}
                    className="w-12 h-12 object-cover aspect-[1] rounded-full"
                    alt="User profile picture"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-500 text-white text-xl aspect-[1] font-semibold">
                    {User_detail?.firstname?.charAt(0) || "?"}
                  </div>
                )}

                <span>
                  <h1 className="font-semibold text-sm">
                    {User_detail.firstname + " " + User_detail.surname}
                  </h1>
                  <h1>{User_detail.mobile_email}</h1>
                </span>
              </div>
              <hr />
              <div className="px-5">
                <ul className="py-3 flex flex-col">
                  <li
                    className="w-full hover:bg-gray-200 py-2 px-2 rounded-md hover:cursor-pointer"
                    onClick={() => {
                      Navigate("/pro");
                    }}
                  >
                    Profile
                  </li>
                  <li
                    className="w-full hover:bg-gray-200 py-2 px-2 rounded-md text-red-500 hover:cursor-pointer"
                    onClick={() => {
                      logout();
                      Navigate("/");
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            " "
          )}
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-14 bg-white border-t border-gray-200 flex justify-around items-center text-gray-600 shadow z-40">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`flex flex-col items-center justify-center text-xl transition-transform ${
              active === item.id
                ? "text-blue-600 scale-110"
                : "hover:text-blue-600"
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </>
  );
};

export default Nav;
