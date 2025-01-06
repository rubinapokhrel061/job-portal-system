"use client";

import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const profilePictureUrl = user?.image;

  const handleSignOut = async () => {
    await signOut();
    localStorage.removeItem("user");
    localStorage.removeItem("profilePictureUrl");
    setUser(null);
  };

  return (
    <header>
      <div className="container items-center flex justify-between">
        <Link href={"/"} className="font-bold text-xl">
          Job Board
        </Link>
        <nav className="flex gap-2">
          {!user && (
            <Link
              href={"/views/login"}
              className="bg-white rounded-full shadow-lg hover:text-[#388E3C] text-sm sm:text-lg font-serif py-2 px-3 md:px-4"
            >
              LogIn
            </Link>
          )}
          {user && (
            <div className="dropdown relative inline-flex">
              <button
                type="button"
                onClick={toggleDropdown}
                className="dropdown-toggle flex gap-1 items-center bg-gray-200 shadow-lg text-[#388E3C] text-sm sm:text-lg font-serif py-2 px-3 md:px-4 rounded-full cursor-pointer"
              >
                Profile
                <FiChevronDown
                  className={`w-3 h-3 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div
                  id="dropdown-default"
                  className="dropdown-menu flex flex-col justify-center items-center rounded-xl shadow-lg bg-white absolute top-full w-32 mt-2"
                >
                  <ul className="py-2">
                    <Link href={"/views/profile"}>
                      <li
                        className="flex gap-1 py-2 px-2 md:px-4"
                        onClick={toggleDropdown}
                      >
                        <p>Profile</p>
                        {profilePictureUrl ? (
                          <Image
                            src={profilePictureUrl}
                            alt="Profile"
                            height={"24"}
                            width="24"
                            className="w-6 h-6 rounded-full"
                          />
                        ) : (
                          <FaUserCircle className="w-6 text-[#FF5722] h-6" />
                        )}
                      </li>
                    </Link>
                    <li>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className=" text-sm sm:text-lg text-[#FF5722] font-serif py-2 px-2 md:px-4"
                      >
                        LogOut
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          <Link
            href={"/views/new-job"}
            className="bg-[#FF5722] rounded-full shadow-lg text-sm sm:text-lg font-serif py-2 px-2 md:px-4"
          >
            Post a Job
          </Link>
        </nav>
      </div>
    </header>
  );
}
