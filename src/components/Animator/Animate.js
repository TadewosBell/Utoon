import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Instructions from "./Instructions";
import classes from "./Animator.module.css";
import { parseGIF, decompressFrames } from 'gifuct-js';
import imgSelectAnimation from "../../assets/image-3.png";
import { setDrawingUrl, setCurrentAnimationUrl } from "../../redux/DrawingStore";
import { animate_character } from "../../Utility/Api";
import GifCanvas from "./Gif_Canvas";

const AnimationOptions = {
  'Dab': {
    'image': require("../../assets/Animations/astro_dab.gif"),
    'animation_id': 'dab',
    'retarget_id': 'fair1_ppf',
  },
  'Dance': {
    'image': require("../../assets/Animations/astro_jesse_dance.gif"),
    'animation_id': 'jesse_dance',
    'retarget_id': 'mixamo_fff',
  },
  'Dance 2': {
    'image': require("../../assets/Animations/astro_kpop_dance.gif"),
    'animation_id': 'kpop_dance',
    'retarget_id': 'mixamo_fff_2',
  },
  'Dance 3': {
    'image': require("../../assets/Animations/astro_kpop_dance_2.gif"),
    'animation_id': 'kpop_dance_2',
    'retarget_id': 'mixamo_fff_2',
  },
  // 'Jumping': {
  //   'image': require("../../assets/Animations/astro_jumping.gif"),
  //   'animation_id': 'jumping',
  //   'retarget_id': 'fair1_ppf',
  // },
  'Jumping Jacks': {
    'image': require("../../assets/Animations/astro_jumping_jacks.gif"),
    'animation_id': 'jumping_jacks',
    'retarget_id': 'cmu1_pfp',
  },
  // 'Wave Hello': {
  //   'image': require("../../assets/Animations/astro_wave_hello.gif"),
  //   'animation_id': 'wave_hello',
  //   'retarget_id': 'fair1_ppf',
  // },
}

const Animations = () => {
  const dispatch = useDispatch();
  const { currentCharacterId, current_animation_url } = useSelector((state) => state.characters);
  const { drawingID } = useSelector((state) => state.image);
  const [animataing_in_progress, set_animating_in_progress] = useState(false);

  const onAnimationSelected = async (animation_id, retarget_id) => {
    console.log(animation_id, drawingID);

    const data = {
      'animation_id': animation_id,
      'char_id': drawingID,
      'retarget_id': retarget_id,
    };

    if(animataing_in_progress) {
      return;
    }
    Swal.fire({
      title: "Loading Animation...",
      html: "Please wait...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    set_animating_in_progress(true);

    await animate_character(data, (res) => {
      console.log(res);
      const new_animation_url = res['animation_url']
      dispatch(setCurrentAnimationUrl(new_animation_url))
      Swal.close();
      set_animating_in_progress(false);

    }, () => {
      Swal.close();
      set_animating_in_progress(false);
    })

  }

  // if set_animating_in_progress is true, then show loading animation
  useState(() => {
    if (animataing_in_progress) {
      Swal.fire({
        title: "Loading Animation...",
        html: "Please wait...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
    }
  }, [animataing_in_progress])
  return (
    <div class="h-[600px] border overflow-y-auto mx-[-30px]">
      <div class="grid grid-cols-3 gap-3">
        {/* map animations, three columns per row */}
        {Object.keys(AnimationOptions).map((key) => {
          return (
            <div class="border-2 border-gray-300" >
              <img
                onClick={() => onAnimationSelected(AnimationOptions[key]['animation_id'], AnimationOptions[key]['retarget_id'])}
                src={AnimationOptions[key]['image']}
                alt=""
                height={200}
                width={200}
                className="bg-auto bg-no-repeat bg-center"
                style={{backgroundColor: 'white',
                // border radius 5px
                borderRadius: '10px',
              
              }}
              />

              <p
                onClick={() => onAnimationSelected(AnimationOptions[key]['animation_id'])}
              >{key}</p>
            </div>
          )
        })}

      </div>

    </div>
  );
};





const AnimationPreview = (props) => {
  const { drawing_url, current_animation_url } = useSelector((state) => state.image);
  const { StepForward, StepBackward } = props;

  return (
    <div>
      <div className={classes["pre-img-box"]}>
        <div className={classes["canvas-wrapper"]}>
          <div className={classes["mask-tool-rapper"]}>
            <img
              className={classes["pre-img"]}
              src={current_animation_url}
              alt="Animation preview"
            />
          </div>
        </div>
        {/* <canvas id="gifCanvas" width="400" height="400"></canvas> */}
        {/* <GifCanvas gifUrl={"https://utoon-animator.s3.amazonaws.com/Animations/qhVKobxxKZ_dab.gif"} /> */}
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
      // <div className={classes["upload-content"]}>
      //   <img
      //     className={classes["upload-box-img"]}
      //     src={imgSelectAnimation}
      //     alt=""
      //   />
      // </div>,
      <Animations />,
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
      <AnimationPreview
        StepForward={props.StepForward}
        StepBackward={props.StepBackward}
      />
    </Instructions>
  );
};

export default Animate;
