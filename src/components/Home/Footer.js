import React from "react";
import classes from "./Footer.module.css";
import LogoImages from "../../assets/Logo.png";
import { subscribe_waitlist } from "../../Utility/Api";
import { Link } from "react-router-dom";

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
              Buy our coloring book and watch the characters come to life!
            </p>
            <Link
              to="https://a.co/d/clzul2Y"
              href="#"
              target="_blank"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 text-lg get-color-book"
            >
              Buy the book
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
    </footer>
  );
};

export default Footer;
