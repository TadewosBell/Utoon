import classes from "./Share.module.css";
import Instructions from "./Instructions";
import imgAnimate from "../../assets/Background-1.png";

const Shares = (props) => {
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
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

const Share = (props) => {
  const instructions = {
    Title: "Share",
    PreText: "Now share your creation",
  };
  const ActiveClassName = `${classes["steps-color"]} ${classes["active"]}`;
  const PrevActiveClassName = `${classes["steps-color"]} ${classes["prev-tab"]}`;
  return (
    <Instructions
      instructions={instructions}
      CSSClassNames1={PrevActiveClassName}
      CSSClassNames2={PrevActiveClassName}
      CSSClassNames3={PrevActiveClassName}
      CSSClassNames4={PrevActiveClassName}
      CSSClassNames5={ActiveClassName}
    >
      <Shares
        StepForward={props.StepForward}
        StepBackward={props.StepBackward}
      />
    </Instructions>
  );
};

export default Share;
