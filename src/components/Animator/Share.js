import classes from "./Share.module.css";
import { useDispatch, useSelector } from "react-redux";
import Instructions from "./Instructions";


const Shares = (props) => {
  const { StepForward, StepBackward } = props;
  const dispatch = useDispatch();
  const { current_animation_url, drawingID, backgroundUrl,  } = useSelector((state) => state.image);
  return (
    <div>
      <div className={classes["pre-img-box"]}>
        <img
          className={classes["pre-img"]}
          src={current_animation_url}
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
