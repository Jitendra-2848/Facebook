import React from "react";
import {
  FaUserCircle,
  FaUserFriends,
  FaClock,
  FaBookmark,
  FaUsers,
  FaVideo,
  FaStore,
  FaRss,
  FaCalendarAlt,
  FaChartBar,
  FaPowerOff,
  FaChevronDown,
} from "react-icons/fa";

const menuItems = [
  { icon: <FaUserCircle className="w-6 h-6 text-blue-500" />, text: "Jitendra" },
  { icon: <FaUserFriends className="w-6 h-6 text-blue-500" />, text: "Friends" },
  { icon: <FaClock className="w-6 h-6 text-blue-500" />, text: "Memories" },
  { icon: <FaBookmark className="w-6 h-6 text-blue-500" />, text: "Saved" },
  { icon: <FaUsers className="w-6 h-6 text-blue-500" />, text: "Groups" },
  { icon: <FaVideo className="w-6 h-6 text-blue-500" />, text: "Video" },
  { icon: <FaStore className="w-6 h-6 text-blue-500" />, text: "Marketplace" },
  { icon: <FaRss className="w-6 h-6 text-blue-500" />, text: "Feeds" },
  { icon: <FaCalendarAlt className="w-6 h-6 text-blue-500" />, text: "Events" },
  { icon: <FaChartBar className="w-6 h-6 text-blue-500" />, text: "Ads Manager" },
  { icon: <FaPowerOff className="w-6 h-6 text-blue-500" />, text: "Crisis response" },
  { icon: <FaChevronDown className="w-6 h-6 text-gray-700" />, text: "See more" },
];

function Sidebar() {
  return (
    <div className="hidden sm:block w-64 bg-gray-50 p-4 h-screen overflow-y-auto">
      <ul className="space-y-3">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-all"
          >
            {item.icon}
            <span className="font-medium text-gray-700">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;