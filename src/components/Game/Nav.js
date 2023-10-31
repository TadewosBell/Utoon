import React, { useState } from "react";
import classes from "./Nav.module.css";
import Logoimage from "../../assets/Logo.png";
import Button from "../UI/Button";

import { Link } from "react-router-dom";

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="nav-bar bg-white dark:bg-[#ffecaf] fixed w-[100%] z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <img src={Logoimage} alt="Logo" />

          <div className="hidden md:flex md:order-2">
            <ul className="flex space-x-8">
              <li>
                <a
                  href="#"
                  className="text-gray-900 hover:text-blue-700 text-xl dark:text-[#1f1f1f] dark:hover:text-[#F36C57]"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/GenerateSprite"
                  className="text-gray-900 hover:text-blue-700 text-xl dark:text-[#1f1f1f] dark:hover:text-[#F36C57]"
                >
                  Generate Sprite
                </a>
              </li>
              <li>
                <a
                  href="#howthisworks"
                  className="text-gray-900 hover:text-blue-700 text-xl dark:text-[#1f1f1f] dark:hover:text-[#F36C57]"
                >
                  How This Works
                </a>
              </li>
            </ul>
          </div>
          {/* <div className="flex md:order-3">
            <Link
              to="/Animator"
              href="#"
              class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-[#27282A] dark:border-gray-700  dark:text-white dark:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  dark:focus:ring-[#1f1f1f]"
            >
              Try it!
            </Link>
          </div> */}
          <button
            type="button"
            onClick={toggleSidebar}
            className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30"
              onClick={toggleSidebar}
            ></div>
          )}
          {sidebarOpen && (
            <div className="md:hidden fixed top-[57px] left-0 w-full h-100 bg-white dark:bg-gray-900 z-40 border-t border-gray-200 dark:border-gray-600">
              <ul className="p-4 mt-4 font-medium">
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/GenerateSprite"
                    className="block py-2 pl-3 pr-4 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  >
                    Generate Sprite
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
