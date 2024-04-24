import React from "react";
import classes from "./Description.module.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

const Description = () => {
  return (
    <div className={classes["home-content-box"]}>
      <div className={classes["container"]}>
        <div className={classes["home-center-wrapper"]}>
          <div className={classes["center-wrap-box"]}>
            <p className={`${classes["center-content"]} text-black`}>
              Watch you characters come to life and dance! 
            </p>
            <div className={classes["center-box-btn"]}>
            <Link
              to="/Animate"
              href="#"
              target="_blank"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 text-lg get-color-book"
            >
              Try Demo
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
