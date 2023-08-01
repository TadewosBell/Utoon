import classes from "./Animator.module.css";
import Instructions from "./Instructions";
import imgAnimate from "../../assets/Background-1.png";
import imgSelectAnimation from "../../assets/image-3.png";
import { useDispatch, useSelector } from "react-redux";
import { displaybackground } from "../../redux/DrawingStore";
import { useEffect, useRef, useState } from "react";
import GifCanvas from "./Gif_Canvas";
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

  const { current_animation_url, drawingUrl, backgroundUrl } = useSelector((state) => state.image);
  const { StepForward, StepBackward } = props;

  // create ref for the animation preview
  const animationPreviewRef = useRef(null);

  useEffect(() => {
    dragElement(document.getElementById("animationPreview"));
  }, [animationPreviewRef]);

  const dragElement = (elmnt) => {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt?.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt?.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      if(elmnt)elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // if element is not postioned on background then do not change position
      const background = document.getElementById("background");
      const backgroundx = background?.offsetLeft;
      const backgroundy = background?.offsetTop;
      const backgroundwidth = background?.offsetWidth;
      const backgroundheight = background?.offsetHeight;

      if (elmnt.offsetTop - pos2 < (backgroundy - 50) || elmnt.offsetTop - pos2 > (backgroundy + backgroundheight - elmnt.offsetHeight + 50)) {
        return;
      }
      if (elmnt.offsetLeft - pos1 < (backgroundx - 50) || elmnt.offsetLeft - pos1 > (backgroundx + backgroundwidth - elmnt.offsetWidth + 50)) {
        return;
      }
      console.log(elmnt.offsetTop - pos2, elmnt.offsetLeft - pos1)
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      console.log(elmnt.style.top, elmnt.style.left)
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  return (
    <div>
      <div className={classes["pre-img-box"]}>
        <div className="" ref={combinedImageRef}>
        {backgroundUrl && (
              <div
                id="background"
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundUrl})`, "width": "600px", "height": "600px", position: "static", "z-index": -1 }}
              >
              </div>
          )}
        <img
                  ref={animationPreviewRef}
                  id="animationPreview"
                  className={classes["animation"]}
                  src={current_animation_url}
                  alt="Animation preview"
                  style={{
                    "position": "absolute",
                    "z-index": -1,
                    "width": "555px",
                    top: "320px",
                    left: "1145px",
                  }}
                  
                />
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
