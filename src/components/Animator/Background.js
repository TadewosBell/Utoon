import classes from "./Animator.module.css";
import Instructions from "./Instructions";
import { setDrawingUrl, setWithBackgroundUrl } from "../../redux/DrawingStore";
import { useDispatch, useSelector } from "react-redux";
import { displaybackground } from "../../redux/DrawingStore";
import { final_render } from "../../Utility/Api";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const selectable_backgrounds = [
  {
    id: 5,
    name: "green"
  },
  {
    id: 6,
    name: "white"
  },
  {
    id: 1,
    name: "Forest"
  },
  {
    id: 2,
    name: "Castle"
  },
  {
    id: 3,
    name: "House"
  },
  {
    id: 4,
    name: "Stage"
  },
]

const Backgrounds = (props) => {
  const combinedImageRef = useRef(null);
  const dispatch = useDispatch();



  const { current_animation_url, drawingID, backgroundUrl,  } = useSelector((state) => state.image);
  const { StepForward, StepBackward } = props;

  // create ref for the animation preview
  const animationPreviewRef = useRef(null);

  // useEffect(() => {
  //   dragElement(document.getElementById("animationPreview"));
  // }, [animationPreviewRef]);

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

  const generate_with_background = async () => {
    Swal.fire({
      title: "Adding Background",
      html: "Please wait...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    // call final render api with 
    // if background_url is null then do not send it, show error
    if(!backgroundUrl) {
      alert("Please select a background")
      return;
    };
    const post_req = {
      gif_url: current_animation_url,
      char_id: drawingID,
      background_url: backgroundUrl,
    }

    await final_render(post_req,(res) => {
      console.log(res);
      const new_animation_url = res['animation_url']
      dispatch(setWithBackgroundUrl(new_animation_url))
      // set_animating_in_progress(false);
      Swal.close();
      StepForward();
    }, () =>  {
      // set_animating_in_progress(false);
    })
  }
  return (
    <div>
      <div className={classes["pre-img-box"]}>
        <div className="relative" ref={combinedImageRef}>
          <img
            className={classes["pre-img"]}
            src={current_animation_url}
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
            onClick={generate_with_background}
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
  const [backgrounds, setBackgrounds] = useState(null);

  useEffect(() => {
    // fetch background from https://utoon-animator.s3.amazonaws.com/Background/{selectable_character.name}.png
    let background_url_list = []
    selectable_backgrounds.forEach((selectable_background) => {
      console.log(`https://utoon-animator.s3.amazonaws.com/Backgrounds/${selectable_background.name}.png`)
      background_url_list.push(`https://utoon-animator.s3.amazonaws.com/Backgrounds/${selectable_background.name}.png`)
    })
    setBackgrounds(background_url_list);
    console.log(backgrounds)
  }, []);

  const dispatch = useDispatch();
  const instructions = {
    Title: "Background",
    PreText: "Select a background to set the scene",
    Directions: [
      <div class="h-[600px] border overflow-y-auto mx-[-30px]">
        <div class="grid grid-cols-3 gap-3">
          {backgrounds?.map((item) => {
            return (
              <div
                class="border-2 border-gray-300"
                onClick={() => dispatch(displaybackground(item))}
              >
                <img
                  src={item}
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
