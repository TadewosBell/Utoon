import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Instructions from "./Instructions";
import classes from "./Animator.module.css";
import { setCurrentAnimationUrl } from "../../redux/DrawingStore";
import { animate_character } from "../../Utility/Api";

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
  'Macarena Dance': {
    'image': require("../../assets/Animations/astro_Macarena.gif"),
    'animation_id': 'Macarena',
    'retarget_id': 'fair1_ppf_2',
  },
  'Chicken Dance': {
    'image': require("../../assets/Animations/astro_Chicken_Dance.gif"),
    'animation_id': 'Chicken_Dance',
    'retarget_id': 'fair1_ppf_2',
  },
  'YMCA': {
    'image': require("../../assets/Animations/astro_YMCA.gif"),
    'animation_id': 'YMCA',
    'retarget_id': 'fair1_ppf_2',
  },
  'Flow Dance': {
    'image': require("../../assets/Animations/astro_kpop_dance.gif"),
    'animation_id': 'kpop_dance',
    'retarget_id': 'mixamo_fff_2',
  },
  'Walk': {
    'image': require("../../assets/Animations/astro_walk.gif"),
    'animation_id': 'Walk',
    'retarget_id': 'mixamo_fff_3',
  },
  'Running': {
    'image': require("../../assets/Animations/astro_running.gif"),
    'animation_id': 'Running',
    'retarget_id': 'fair1_ppf_2',
  },
  'Jumping Jacks': {
    'image': require("../../assets/Animations/astro_jumping_jacks.gif"),
    'animation_id': 'jumping_jacks',
    'retarget_id': 'cmu1_pfp',
  },
  'Jump': {
    'image': require("../../assets/Animations/astro_jump.gif"),
    'animation_id': 'Jump',
    'retarget_id': 'fair1_ppf_2',
  }
}

const devAnimations = {
  'Game_Jump': {
    'image': require("../../assets/Animations/astro_jump.gif"),
    'animation_id': 'Game_Jump',
    'retarget_id': 'fair1_ppf_2',
  },
  'Pain': {
    'image': require("../../assets/Animations/astro_jump.gif"),
    'animation_id': 'Pain',
    'retarget_id': 'fair1_ppf_2',
  },
  'Swing': {
    'image': require("../../assets/Animations/astro_jump.gif"),
    'animation_id': 'Swing',
    'retarget_id': 'fair1_ppf_2',
  }
}

// if node env is development, then add devAnimations to AnimationOptions
if (process.env.NODE_ENV === 'development') {
  Object.assign(AnimationOptions, devAnimations);
}

const Animations = () => {
  const dispatch = useDispatch();
  const { currentCharacterId, current_animation_url } = useSelector((state) => state.characters);
  const { drawingID } = useSelector((state) => state.image);
  const [animataing_in_progress, set_animating_in_progress] = useState(false);
  const [triedTwice, setTriedTwice] = useState(false);
  const onAnimationSelected = async (animation_id, retarget_id) => {

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
      const new_animation_url = res['animation_url']
      dispatch(setCurrentAnimationUrl(new_animation_url))
      Swal.close();
      set_animating_in_progress(false);

    },() => {
      if(!triedTwice){
        setTriedTwice(true);
        // delay untill setTriedTwice is set to true
        setTimeout(() => {
        onAnimationSelected(animation_id, retarget_id);
        }, 500);
      }
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
    Direction_Alt_Title: "Select an animation",
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
