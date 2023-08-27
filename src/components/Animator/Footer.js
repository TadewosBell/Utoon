import React from "react";
import classes from "./Footer.module.css";
import imgVector from "../../assets/Vector.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={classes["footer"]}>
      {/* <div className={classes["footer-row"]}>
        <div className={classes["footer-col-left"]}>
          <div className={classes["footer-inner-row"]}>
            <span className={classes["footer-about"]}>About This Demo</span>
            <div className={classes["feedback-row"]}>
              <span className={classes["feed-text"]}>Feedback</span>
              <img src={imgVector} alt="Vector" />
            </div>
          </div>
        </div>
        <div className={classes["footer-col-right"]}>
          <ul className={classes["footer-menus"]}>
            <li className={classes["footer-menu"]}>
              <Link className={classes["footer-menu-link"]}>
                Privacy Policy
              </Link>
              <Link className={classes["footer-menu-link"]}>
                Terms
              </Link>
              <Link className={classes["footer-menu-link"]}>
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
