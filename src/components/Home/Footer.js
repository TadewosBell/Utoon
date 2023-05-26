import React from "react";
import classes from "./Footer.module.css";
import LogoImages from "../../assets/Logo.png";
import Button from "../UI/Button";

const Footer = () => {
  return (
    <footer className={classes["site-footer"]}>
      <div className={classes["container"]}>
        <div className={classes["site-footer-row"]}>
          <div className={classes["site-footer-col"]}>
            <img
              className={classes["footer-logo"]}
              src={LogoImages}
              alt="Logo"
            />
            <ul className={classes["footer-menu-list"]}>
              <li className={classes["footer-list"]}>
                <a href="#" className={classes["footer-list-link"]}>
                  Instagram
                </a>
              </li>
              <li className={classes["footer-list"]}>
                <a href="#" className={classes["footer-list-link"]}>
                  Twitter
                </a>
              </li>
              <li className={classes["footer-list"]}>
                <a href="#" className={classes["footer-list-link"]}>
                  Facebook
                </a>
              </li>
            </ul>
            <div className={classes["copyright-text"]}>
              <p>© 2023 Utoon. All rights reserved.</p>
            </div>
          </div>
          <div className={classes["site-footer-right"]}>
            <p className={classes["newsletter-text"]}>
              Join our news letter to receive special offers.
            </p>
            <div className={classes["footer-newsletter-row"]}>
              <input
                className={classes["footer-input"]}
                type="text"
                placeholder="Email"
              />
              <Button classes={classes["footer-submit-button"]} type="submit">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
