//import classes from "./Animator.module.css";
import Instruction from "./Instructions";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setCoordinates, setBoundingBox, setCurrentAnimationUrl, setSkeleton } from "../../redux/DrawingStore";
import { setMaskBase64 } from "../../redux/MaskEditorStore";
import { intial_animation, set_mask, set_skeleton } from "../../Utility/Api";
import { calculateRatio, resizedataURL } from "../../Utility/Helper";
import { addCharacter } from "../../redux/charactersLibrary";
import classes from "./Animator.module.css";
import JointEditor from "../Canvas/JointEditor";
// component with one one side showing directions and the other side showing an image of the character
// on the bottom there is a coursel of images of different characters

const skeleton_image = require("../../assets/Tutorial/Skeleton.JPG")

const EditSkeleton = (props) => {

  const canvasWindow = useRef(null);
  const { StepForward, StepBackward, Game } = props;
  const { drawingID, cropped_image_url, cropped_image_dimensions, mask_url, skeleton } = useSelector((state) => state.image);
  const dispatch = useDispatch();
  const layerRef = useRef(null);
  const [imgScale, setImgScale] = useState(0);
  const [triedTwice, setTriedTwice] = useState(false);
  useEffect(() => {
    const ratio = calculateRatio(
      canvasWindow.current.offsetWidth - 45, // Toolbar Offset
      canvasWindow.current.offsetHeight - 45, // Toolbar Offset
      cropped_image_dimensions.width,
      cropped_image_dimensions.height
    );
    setImgScale(ratio);

  }, [canvasWindow]);


  const NextStep = async () => {
    if(Game) {
      StepForward();
      return;
    }

    const set_skeleton_req = {
      char_id: drawingID,
      skeleton: skeleton
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

    await set_skeleton(set_skeleton_req, (res) => {
      console.log("set_skeleton", res)
    })

    const intial_animation_req = {
      char_id: drawingID,
    };
    await intial_animation(intial_animation_req, (res) => {
      const animation_1 = res['animation_url']
      const Char_id = res['char_id']
      dispatch(setCurrentAnimationUrl(animation_1));
      dispatch(addCharacter(Char_id));
      StepForward();

    }, () => {
      // retry animation
      if(!triedTwice){
        setTriedTwice(true);
        // delay untill setTriedTwice is set to true
        setTimeout(() => {
        NextStep();
        }, 1000);
      }
    })


    Swal.close();

  };

  const instructions = {
    Title: "Edit Skeleton",
    PreText:
      "Edit skeleton to match the pose of the character.",
    Directions: [
      "Click and move the joints to match the character's pose.",
      <div class="h-[600px] border overflow-y-auto mx-[-30px]">
        <img src={skeleton_image} alt="" className={classes["tutorial_image"]}  />
      </div>,
    ],
  };

  return (
    <Fragment>
      <Instruction
        instructions={instructions}
      >
        <div ref={canvasWindow} className={classes["pre-img-box"]}>
          {/* <div className={classes["canvas-wrapper"]}>
            <div className={classes["mask-tool-rapper"]}> */}
              {
                skeleton && (
                  <JointEditor
                    imageUrl={cropped_image_url}
                    originalPoints={skeleton}
                    imageHeight={cropped_image_dimensions.height}
                    imageWidth={cropped_image_dimensions.width}
                    scale={imgScale}
                    setSkeleton={setSkeleton}
                  />
                )
              }
            </div>
          {/* </div>
        </div> */}
        <div className={classes["button-row"]}>
          <div className={classes["button-col"]}>
            <button className={classes["prev-btn"]} onClick={StepBackward}>
              Previous
            </button>
          </div>
          <div className={classes["button-col"]}>
            <button onClick={NextStep} className={classes["next-btn"]}>
              Next
            </button>
          </div>
        </div>
      </Instruction>
    </Fragment>
  );
};

export default EditSkeleton;
