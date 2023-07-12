import classes from "./Animator.module.css";
import Instructions from "./Instructions";
import imgAnimate from "../../assets/Background-1.png";
import imgSelectAnimation from "../../assets/image-3.png";
import { useDispatch, useSelector } from "react-redux";
import { displaybackground } from "../../redux/imageSlice";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import GIF from "gif.js";

const Backgrounds = (props) => {
  const combinedImageRef = useRef(null);

  const handlerGenerateImage = async () => {
    const canvas = await html2canvas(combinedImageRef.current);

    const gif = new GIF();
    gif.addFrame(canvas, { delay: 200 });
    gif.on("finished", (blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        const gifDataUrl = reader.result;
        console.log(gifDataUrl);
      };
      reader.readAsDataURL(blob);
    });
    gif.render();
  };

  const { imageUrl, backgroundUrl } = useSelector((state) => state.image);
  const { StepForward, StepBackward } = props;

  return (
    <div>
      <div className={classes["pre-img-box"]}>
        <div className="relative" ref={combinedImageRef}>
          <img
            className={classes["pre-img"]}
            src={imageUrl}
            alt="Animation preview"
          />
          {backgroundUrl && (
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundUrl})`, zIndex: -1 }}
              ></div>
            </div>
          )}
        </div>
      </div>
      <div className={classes["button-row"]}>
        <div className={classes["button-col"]}>
          <button className={classes["prev-btn"]} onClick={StepBackward}>
            Previous
          </button>
        </div>
        <div className={classes["button-col"]}>
          <button
            onClick={() => {
              handlerGenerateImage();
              return StepForward;
            }}
            className={classes["next-btn"]}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const Background = (props) => {
  const [background, setBackground] = useState(null);

  useEffect(() => {
    fetch(
      "https://pixabay.com/api/?key=38219264-01b184f5a26d1d3eb3f986ba8&q=background&image_type=photo"
    )
      .then((res) => res.json())
      .then((data) => setBackground(data));
  }, []);

  const dispatch = useDispatch();
  const instructions = {
    Title: "Background",
    PreText: "Select a background to set the scene",
    Directions: [
      <div class="h-[600px] border overflow-y-auto mx-[-30px]">
        <div class="grid grid-cols-3 gap-3">
          {background?.hits?.map((item) => {
            return (
              <div
                class="border-2 border-gray-300"
                onClick={() => dispatch(displaybackground(item.largeImageURL))}
              >
                <img
                  src={item.largeImageURL}
                  alt=""
                  height={200}
                  width={200}
                  className="bg-auto bg-no-repeat bg-center"
                />
              </div>
            );
          })}
          {/* <div
            class="border-2 h-[150px] border-gray-300"
            onClick={() => dispatch(displaybackground(imgAnimate))}
          >
            <img
              src={imgAnimate}
              alt=""
              height={200}
              width={200}
              className="bg-auto bg-no-repeat bg-center"
            />
          </div> */}
        </div>
      </div>,
    ],
  };
  const ActiveClassName = `${classes["steps-color"]} ${classes["active"]}`;
  const InActiveClassName = `${classes["steps-color"]}`;
  const PrevActiveClassName = `${classes["steps-color"]} ${classes["prev-tab"]}`;

  return (
    <>
      <Instructions
        instructions={instructions}
        CSSClassNames1={PrevActiveClassName}
        CSSClassNames2={PrevActiveClassName}
        CSSClassNames3={ActiveClassName}
        CSSClassNames4={InActiveClassName}
        CSSClassNames5={InActiveClassName}
      >
        <Backgrounds
          StepForward={props.StepForward}
          StepBackward={props.StepBackward}
        />
      </Instructions>
    </>
  );
};

export default Background;
