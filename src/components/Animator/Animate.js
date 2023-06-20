import Instructions from "./Instructions";
import classes from "./Animator.module.css";
import imgAnimate from "../../assets/image-1.png";
import imgSelectAnimation from "../../assets/image-3.png";

const Animations = (props) => {
  const { StepForward, StepBackward } = props;
  return (
    <div>
      <div className={classes["pre-img-box"]}>
        <img
          className={classes["pre-img"]}
          src={imgAnimate}
          alt="Animation preview"
        />
      </div>
      <div className={classes["button-row"]}>
        <div className={classes["button-col"]}>
          <button className={classes["prev-btn"]} onClick={StepBackward}>
            Previous
          </button>
        </div>
        <div className={classes["button-col"]}>
          <button onClick={StepForward} className={classes["next-btn"]}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const Animate = (props) => {
  const instructions = {
    Title: "Animate",
    PreText: "Select an animation and watch your character come to life!",
    Directions: [
      <div className={classes["upload-content"]}>
        <img
          className={classes["upload-box-img"]}
          src={imgSelectAnimation}
          alt=""
        />
      </div>,
    ],
  };
  const ActiveClassName = `${classes["steps-color"]} ${classes["active"]}`;
  const InActiveClassName = `${classes["steps-color"]}`;
  const PrevActiveClassName = `${classes["steps-color"]} ${classes["prev-tab"]}`;
  return (
    <Instructions
      instructions={instructions}
      CSSClassNames1={PrevActiveClassName}
      CSSClassNames2={ActiveClassName}
      CSSClassNames3={InActiveClassName}
      CSSClassNames4={InActiveClassName}
      CSSClassNames5={InActiveClassName}
    >
      <Animations
        StepForward={props.StepForward}
        StepBackward={props.StepBackward}
      />
    </Instructions>
  );
};

export default Animate;
