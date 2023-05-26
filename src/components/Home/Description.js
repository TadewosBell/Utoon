import React from "react";
import classes from "./Description.module.css";
import Button from "../UI/Button";

const Description = () => {
  return (
    <div className={classes["home-content-box"]}>
      <div className={classes["container"]}>
        <div className={classes["home-center-wrapper"]}>
          <div className={classes["center-wrap-box"]}>
            <p className={classes["center-content"]}>
              U-Toon lets you bring drawing to life so you can create virtual
              cards that will last a life time. Simply Insert your child’s
              drawing, customize your card and send it to your loved ones.
            </p>
            <div className={classes["center-box-btn"]}>
              {/* <a href="#" className={classes["create-card"]}>
                Create Card
              </a> */}
              <Button classes={classes["create-card"]} type="submit">
                Create a card
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
