import React from "react";
import classes from "./Description.module.css";
import Button from "../UI/Button";

const Description = () => {
  return (
    <div className={classes["home-content-box"]}>
      <div className={classes["container"]}>
        <div className={classes["home-center-wrapper"]}>
          <div className={classes["center-wrap-box"]}>
            <p className={`${classes["center-content"]} text-black`}>
              U-Toon lets you bring drawing to life so you can create virtual
              cards that will last a life time. Simply Insert your child’s
              drawing, customize your card and send it to your loved ones.
            </p>
            <div className={classes["center-box-btn"]}>
              {/* <a href="#" className={classes["create-card"]}>
                Create Card
              </a> */}
              <a
                href="#"
                class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-[#27282A] dark:border-gray-700 dark:hover:bg-[#EA7E2E] dark:focus:ring-gray-800"
              >
                Create a Card
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
