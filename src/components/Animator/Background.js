import classes from "./Animator.module.css";
import Instructions from "./Instructions";
import imgAnimate from "../../assets/Background-1.png";
import imgSelectAnimation from "../../assets/image-3.png";
import { useDispatch, useSelector } from "react-redux";
import { displaybackground } from "../../redux/imageSlice";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";
import "gifler";


const Backgrounds = (props) => {
  const combinedImageRef = useRef(null);

  // gifler will be imported into the global window object

  const GIF = ({ src }) => {
    const imageRef = useRef(null);
    const canvas = React.useMemo(() => {
      const node = document.createElement("canvas");
      return node;
    }, []);

    const [currentFrame, setCurrentFrame] = useState(0);

    React.useEffect(() => {
      // save animation instance to stop it on unmount
      let anim;
      window.gifler(src).get((a) => {
        anim = a;
        anim.animateInCanvas(canvas);

        const totalFrames = anim.getFrames().length;

        const updateFrame = () => {
          anim.onDrawFrame = (ctx, frame) => {
            ctx.drawImage(frame.buffer, frame.x, frame.y);
          };

          // Increment the currentFrame and loop back to the first frame if needed
          setCurrentFrame((prevFrame) => (prevFrame + 1) % totalFrames);
          anim.animateToFrame(currentFrame);
        };

        const frameInterval = setInterval(updateFrame, 100); // Adjust the frame update speed here (in milliseconds)

        return () => {
          clearInterval(frameInterval);
          anim.stop();
        };
      });
    }, [src, canvas, currentFrame]);

    return <Image image={canvas} ref={imageRef} />;
  };
  

  const { imageUrl, backgroundUrl } = useSelector((state) => state.image);
  const { StepForward, StepBackward } = props;

  

  return (
    <div>
      <div className={classes["pre-img-box"]}>
        <div className="relative" ref={combinedImageRef}>
          {/* <Video src={imageUrl} /> */}
          {/* https://utoon-animator.s3.amazonaws.com/Animations/IprKHEinda.gif */}
          <GIF src="https://utoon-animator.s3.amazonaws.com/Animations/IprKHEinda.gif" />
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
              // handlerGenerateImage();
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
