import { Fragment } from "react";
import classes from "./Instructions.module.css";
import imgLogo from "../../assets/Logo.png";

// component with one one side showing directions and the other side showing an image of the character
// on the bottom there is a coursel of images of different characters

const Instructions = (props) => {
  const { Title, PreText, Directions } = props.instructions;
  const {
    CSSClassNames1,
    CSSClassNames2,
    CSSClassNames3,
    CSSClassNames4,
    CSSClassNames5,
  } = props;
  //const activeClassNames = `${classes["steps-color"]} ${classes["active"]}`;
  //console.log(props.CSSClassNames1);
  return (
    <Fragment>
      <div className={classes["utoon-col-left"]}>
        <div className={classes["utoon-col-left-inner"]}>
          <div className={classes["utoon-logo"]}>
            <img src={imgLogo} alt="Logo" />
          </div>
          <div className={classes["step-counter"]}>
            <div className={classes["step-count-row"]}>
              <span className={classes["step-text"]}>Step</span>
              <div className={classes["step-count"]}>
                <span className={classes["step-active-num"]}>1</span>/5
              </div>
            </div>
            <div className={classes["step-count-colors"]}>
              <div className={CSSClassNames1}></div>
              <div className={CSSClassNames2}></div>
              <div className={CSSClassNames3}></div>
              <div className={CSSClassNames4}></div>
              <div className={CSSClassNames5}></div>
            </div>
            <div className={classes["upload-box-info"]}>
              <h2 className={classes["upload-title"]}>{Title}</h2>
              <p className={classes["upload-info"]}>{PreText}</p>
              <div className={classes["upload-content"]}>
                {Directions && (
                  <h3 className={classes["upload-direction-title"]}>
                    Directions
                  </h3>
                )}
                <div className={classes["directions-content"]}>
                  {Directions?.map((direction, index) => {
                    return <p key={index}>{direction}</p>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes["utoon-col-right"]}>
        <div className={classes["utoon-col-right-inner"]}>
          <div className={classes["utoon-upload-box"]}>
            <div className={classes["pre-box"]}>{props.children}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Instructions;
