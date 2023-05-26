import React, { Fragment } from "react";
import classes from "./Nav.module.css";
import Logoimage from "../../assets/Logo.png";
import Button from "../UI/Button";

const Nav = () => {
  return (
    <Fragment>
      <header className={classes["site-header"]}>
        <div className={classes["container"]}>
          <div className={classes["header-wrap"]}>
            <div className={classes["header-row"]}>
              <div className={classes["header-col-left"]}>
                <div className={classes["header-logo"]}>
                  <img src={Logoimage} alt="Logo" />
                </div>
              </div>
              <div className={classes["header-col-center"]}>
                <div className={classes["hedaer-menu"]}>
                  <ul className={classes["header-menu-items"]}>
                    <li className={classes["header-menu-item"]}>
                      <a href="#" className={classes["menu-link"]}>
                        Explore
                      </a>
                    </li>
                    <li className={classes["header-menu-item"]}>
                      <a href="#" className={classes["menu-link"]}>
                        Create
                      </a>
                    </li>
                    <li className={classes["header-menu-item"]}>
                      <a href="#" className={classes["menu-link"]}>
                        About
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={classes["header-col-right"]}>
                <div className={classes["header-btn"]}>
                  {/* <button className={classes["header-btn-link"]} type="submit">
                    Create
                  </button> */}
                  <Button classes={classes["header-btn-link"]} type="submit">
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Nav;
