//import classes from "./Animator.module.css";
import Instruction from "./Instructions";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCoordinates, setBoundingBox, setCurrentAnimationUrl, setSkeleton } from "../../redux/DrawingStore";
import { setMaskBase64 } from "../../redux/MaskEditorStore";
import { intial_animation, set_mask, set_skeleton } from "../../Utility/Api";
import { calculateRatio, resizedataURL } from "../../Utility/Helper";
import { addCharacter } from "../../redux/charactersLibrary";
import classes from "./Animator.module.css";
import JointEditor from "../Canvas/JointEditor";
// component with one one side showing directions and the other side showing an image of the character
// on the bottom there is a coursel of images of different characters

const EditSkeleton = (props) => {

  const canvasWindow = useRef(null);
  const { StepForward, StepBackward } = props;
  const { drawingID, cropped_image_url, cropped_image_dimensions, mask_url, skeleton } = useSelector((state) => state.image);
  const dispatch = useDispatch();
  const layerRef = useRef(null);
  const [imgScale, setImgScale] = useState(0);

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
    const set_skeleton_req = {
      char_id: drawingID,
      skeleton: skeleton
    }

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
      console.log("intial_animation", res)

    })


    console.log("Next Step await worked?")

    StepForward();

  };

  const instructions = {
    Title: "Edit Skeleton",
    PreText:
      "Upload drawing of ONE humanlike character. Make sure to not make the arms and legs overlap in the drawing.",
    Directions: [
      "Draw your character on a white background, like a piece of paper or white board. Make sure the background is as clean and smooth as possible.",
      "Make sure to take the picture of your drawing in a well lit area, and hold the camera further away to minimize shadows.",
      <div class="h-[600px] border overflow-y-auto mx-[-30px]">
      </div>,
    ],
  };

  return (
    <Fragment>
      <Instruction
        instructions={instructions}
      >
        <div ref={canvasWindow} className={classes["pre-img-box"]}>
          <div className={classes["canvas-wrapper"]}>
            <div className={classes["mask-tool-rapper"]}>
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
          </div>
        </div>
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
