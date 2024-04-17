import React from "react";
import classes from "./Footer.module.css";
import LogoImages from "../../assets/Logo.png";
import { subscribe_waitlist } from "../../Utility/Api";
import Button from "../UI/Button";

const Footer = () => {
  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState(false)

  const subscribe_to_waitlist =  async () => {
    const response = await subscribe_waitlist({
      email
    });
    if(response.status == 200){
      setSuccess(true)
    }
  }
  return (
    <footer className={classes["site-footer"]} id="contact">
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
              Subscribe to our newsletter to get updates
            </p>
            <div className={classes["footer-newsletter-row"]}>
              <input
                className={classes["footer-input"]}
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)}}
              />
              <button className={classes["footer-submit-button"]} 
              onClick={subscribe_to_waitlist} >
                Subscribe
              </button>
            </div>
            {
            success &&
            <p className={classes["newsletter-text"]}>
            You are all set!
            </p>
            }
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
