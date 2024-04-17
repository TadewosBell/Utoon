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
              <Link to="/Animator">
                <Button classes={classes["create-card"]} type="submit">
                  Try it!
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
