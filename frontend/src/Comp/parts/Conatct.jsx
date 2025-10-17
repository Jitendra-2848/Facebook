import React from "react";
import { FaSearch, FaEllipsisH, FaPlus, FaEdit, FaCheckCircle } from "react-icons/fa";

const contacts = [
  { name: "Meta AI", img: "x", verified: true },
  { name: "Suresh Sahoo", img: "x", online: true },
  { name: "Hunter Cdy", img: "x" },
  { name: "Nikul Prajapati", img: "x", active: "17m" },
  { name: "Janak Solanki", img: "x" },
  { name: "Rajnish Kumar", img: "x", active: "28m" },
  { name: "Prajapati Sumit", img: "x" },
];

function ContactsSidebar() {
  return (
    <div className="hidden w-72 bg-gray-50 h-screen lg:flex flex-col p-3 border-l border-gray-200">
      <div className="flex justify-between items-center px-2 mb-2">
        <h2 className="text-lg font-semibold text-gray-700">Contacts</h2>
        <div className="flex space-x-2 text-gray-600">
          <FaSearch className="w-4 h-4 cursor-pointer" />
          <FaEllipsisH className="w-4 h-4 cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto">
        {contacts.map((c, i) => (
          <div
            key={i}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition"
          >
            <div className="relative">
              <img
                src={c.img}
                alt={c.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {c.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-700 flex items-center space-x-1">
                {c.name}
                {c.verified && (
                  <FaCheckCircle className="text-blue-500 w-3 h-3" />
                )}
              </span>
              {c.active && (
                <span className="text-xs text-green-600 font-semibold">
                  {c.active}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-3 pt-3">
        <h3 className="text-gray-600 text-sm font-semibold mb-2">Group chats</h3>
        <div className="flex items-center space-x-3 text-gray-700 hover:bg-gray-200 rounded-lg p-2 cursor-pointer transition">
          <FaPlus className="w-4 h-4 text-gray-700" />
          <span className="text-sm font-medium">Create group chat</span>
        </div>
      </div>

      <button className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition">
        <FaEdit className="w-5 h-5" />
      </button>
    </div>
  );
}

export default ContactsSidebar;