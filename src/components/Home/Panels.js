import React from "react";
import classes from "./Panels.module.css";
import KidImages from "../../assets/Draw instruction 3.png";
import AnimateImages from "../../assets/animate 1.gif";
import Give2Images from "../../assets/Give-2 2.png";

const Panels = () => {
  return (
    <section className={classes["home-block-section"]}>
      <div className={classes["container"]}>
        <div className={classes["home-block-wrapper"]}>
          <div className={classes["home-block-row"]}>
            <div className={classes["home-block-col"]}>
              <div className={classes["block-inner"]}>
                <img src={KidImages} className={classes["panel-img"]} alt="Draw" />
                <h3 className={classes["work-inner-title"]}>Draw</h3>
              </div>
            </div>
            <div className={classes["home-block-col"]}>
              <div className={classes["block-inner"]}>
                <img src={AnimateImages} className={classes["panel-img"]} alt="Animate" />
                <h3 className={classes["work-inner-title"]}>Animate</h3>
              </div>
            </div>
            {/* <div className={classes["home-block-col"]}>
              <div className={classes["block-inner"]}>
                <img src={Give2Images} alt="Give" />
                <h3 className={classes["work-inner-title"]}>Give</h3>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Panels;