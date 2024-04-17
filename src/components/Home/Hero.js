import React from "react";
import { subscribe_waitlist } from "../../Utility/Api";
import classes from "./Hero.module.css";
import BannerLeftImage from "../../assets/banner-left.png";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { BsController } from "react-icons/bs";

const fourSquares = [
  require("../../assets/Animations/astro_dab.gif"),
  require("../../assets/Animations/astro_jesse_dance.gif"),
  require("../../assets/Animations/astro_kpop_dance.gif"),
  require("../../assets/Animations/astro_jumping_jacks.gif")
]

const Hero = () => {

  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState(false)

  const subscribe_to_waitlist =  async () => {
    window.open(
      "https://a.co/d/clzul2Y", "_blank");
  }
  return (
    <section className="bg-white dark:bg-[#FFD2D7] mt-[80px] border">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-transparent text-6xl bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            Make your drawings come to life!
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-xl lg:text-[2rem] dark:text-[#333333]">
          </p>
          <div className={classes["site-footer-right"]}>
          <Link
            to="https://a.co/d/clzul2Y"
            href="#"
            target="_blank"
            className={"inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg hover:text-[#EC7179] focus:ring-4 focus:ring-#[FFD2D7] dark:focus:ring-[#FFD2D7] text-lg get-color-book"}
          >
            Get Coloring Book
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>

          </Link>
            <Link
            to="/Animator"
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-primary-700 hover:text-[#EC7179] focus:ring-4 focus:ring-#[FFD2D7] dark:focus:ring-[#FFD2D7] text-lg"
          >
            Animate
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>

          </Link>
          </div>
        </div>
        
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <div className={classes["four_squares"]}>
          <div className={classes["i1"]}><img src={fourSquares[0]}/></div>
          <div className={classes["i2"]}><img src={fourSquares[1]}/></div>
          <div className={classes["i3"]}><img src={fourSquares[2]}/></div>
          <div className={classes["i4"]}><img src={fourSquares[3]}/></div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;