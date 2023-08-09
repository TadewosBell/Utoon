import React from "react";
import classes from "./Hero.module.css";
import BannerLeftImage from "../../assets/banner-left.png";
import Button from "../UI/Button";

const Hero = () => {
  return (
    <section class="bg-white dark:bg-[#FFD2D7] mt-[80px] border">
      <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
          <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-transparent text-8xl bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            Make your drawings come to life!
          </h1>
          <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-xl lg:text-[2rem] dark:text-[#333333]">
            Animate your favorite drawings and create a virtual card that move
            hearts.
          </p>
          <a
            href="#"
            class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-primary-700 hover:text-[#EC7179] focus:ring-4 focus:ring-#[FFD2D7] dark:focus:ring-[#FFD2D7] text-lg"
          >
            Get started
            <svg
              class="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg dark:hover:text-[#1f1f1f] text-lg dark:border-gray-700 dark:hover:bg-[#EC7179]"
          >
            Learn how this works
          </a>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={BannerLeftImage} alt="mockup" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
