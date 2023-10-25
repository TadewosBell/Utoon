import classes from "./Share.module.css";
import { useDispatch, useSelector } from "react-redux";
import Instructions from "./Instructions";


const Shares = (props) => {
  const { StepForward, StepBackward } = props;
  const dispatch = useDispatch();
  const { with_background_url, drawingID, backgroundUrl,  } = useSelector((state) => state.image);

  const downloadGif = async () => {
    // download gif from with_background_url
    fetch(with_background_url, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Animation.gif"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <div>
      <div className={classes["pre-img-box"]}>
        <img
          className={classes["pre-img"]}
          src={with_background_url}
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
          <button onClick={downloadGif} className={classes["next-btn"]}>
            Download
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
