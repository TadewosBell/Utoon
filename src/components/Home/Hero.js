import React from "react";
import classes from "./Hero.module.css";
import BannerLeftImage from "../../assets/banner-left.png";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className={classes["home-banner"]}>
      <div className={classes["container"]}>
        <div className={classes["home-banner-wrapper"]}>
          <div className={classes["home-banner-row"]}>
            <div className={classes["banner-left-col"]}>
              <div className={classes["banner-left-inner"]}>
                <h2 className={classes["banner-title"]}>
                  Make your drawings come to life
                </h2>
                <p className={classes["banner-content"]}>
                  Animate your favorite drawings and create a virtual card that
                  move hearts.
                </p>
                {/* <a href="#" className={classes["create-card"]}>
                  Create
                </a> */}
                <Link to="/Animator">
                <Button classes={classes["create-card"]} type="submit">
                  Create
                </Button>
                </Link>
              </div>
            </div>
            <div className={classes["banner-right-col"]}>
              <div className={classes["banner-right-inner"]}>
                <img src={BannerLeftImage} alt="Banner" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
