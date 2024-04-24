import { Fragment } from "react";
import classes from "./Sound.module.css";
import Instructions from "./Instructions";
import imgSoundRecord from "../../assets/record.png";

const Sounds = (props) => {
  const { StepForward, StepBackward } = props;
  return (
    <div>
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

const Sound = (props) => {
  const instructions = {
    Title: "Sound",
    PreText: "Record a sound or select a sound from the library",
    Directions: [
      <Fragment>
        <div className={classes["directions-content"]}>
          <p>Click the mic button and record an audio.</p>
        </div>
        <div className={classes["record-wrap"]}>
          <img className={classes["record-img"]} src={imgSoundRecord} alt="" />
        </div>
      </Fragment>,
    ],
  };
  const ActiveClassName = `${classes["steps-color"]} ${classes["active"]}`;
  const InActiveClassName = `${classes["steps-color"]}`;
  const PrevActiveClassName = `${classes["steps-color"]} ${classes["prev-tab"]}`;
  return (
    <Instructions
      instructions={instructions}
      CSSClassNames1={PrevActiveClassName}
      CSSClassNames2={PrevActiveClassName}
      CSSClassNames3={PrevActiveClassName}
      CSSClassNames4={ActiveClassName}
      CSSClassNames5={InActiveClassName}
    >
      <Sounds
        StepForward={props.StepForward}
        StepBackward={props.StepBackward}
      />
    </Instructions>
  );
};

export default Sound;
