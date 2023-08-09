import React from "react";
import classes from "./Panels.module.css";
import KidImages from "../../assets/Kid drawing 1.png";
// import AnimateImages from "../../assets/animate 1.png";
// import Give2Images from "../../assets/Give-2 2.png";

const Panels = () => {
  return (
    <section className={`${classes["home-block-section"]} bg-[#EA7E2E]`}>
      <div className={classes["container"]}>
        <div class="grid lg:grid-cols-3 gap-2 md:grid-cols-1">
          <div>
            <img class="" src={KidImages} alt="" />
            <h3 className={classes["work-inner-title"]}>Draw</h3>
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
              alt=""
            />
            <h3 className={classes["work-inner-title"]}>Animate</h3>
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
              alt=""
            />
            <h3 className={classes["work-inner-title"]}>Give</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Panels;
