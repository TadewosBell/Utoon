//import classes from "./Animator.module.css";
import Instruction from "./Instructions";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCoordinates,
  setBoundingBox,
  setCroppedImageDimensions,
  setSkeleton,
} from "../../redux/DrawingStore";
import { setMaskBase64 } from "../../redux/MaskEditorStore";
import { get_skeleton, set_mask } from "../../Utility/Api";
import {
  calculateRatio,
  resizedataURL,
  mapJointsToPose,
} from "../../Utility/Helper";
import MaskStage from "../Canvas/MaskStage";

import classes from "./Animator.module.css";
import MaskingToolbar from "../Canvas/MaskingToolbar";
// component with one one side showing directions and the other side showing an image of the character
// on the bottom there is a coursel of images of different characters

const EditMask = (props) => {
  const canvasWindow = useRef(null);
  const { StepForward, StepBackward } = props;
  const { drawingID, cropped_image_url, cropped_image_dimensions } =
    useSelector((state) => state.image);
  const dispatch = useDispatch();
  const layerRef = useRef(null);
  const [imgScale, setImgScale] = useState(0);

  useEffect(() => {
    // get cropped image dimensions from image
    const cropped_image = new Image();
    if (cropped_image_url !== null && cropped_image_url !== undefined)
      cropped_image.src = cropped_image_url; // cropped image base64
    cropped_image.onload = () => {
      if (canvasWindow.current) {
        dispatch(
          setCroppedImageDimensions({
            width: cropped_image.naturalWidth,
            height: cropped_image.naturalHeight,
          })
        );

        const ratio = calculateRatio(
          canvasWindow.current.offsetWidth - 45, // Toolbar Offset
          canvasWindow.current.offsetHeight - 45, // Toolbar Offset
          cropped_image.naturalWidth,
          cropped_image.naturalHeight
        );
        setImgScale(ratio);
      }
    };
  }, [canvasWindow]);

  const NextStep = async () => {
    const uri = layerRef.current?.toDataURL();
    const newDataUri = await resizedataURL(
      uri,
      cropped_image_dimensions.width,
      cropped_image_dimensions.height
    );
    setMaskBase64(newDataUri); // base64

    const response = await fetch(newDataUri || uri);
    const blob = await response.blob();
    const mask = new File([blob], "mask.png", {
      type: "image/png",
      lastModified: Date.now(),
    });

    // convert to base64
    const reader = new FileReader();
    reader.readAsDataURL(mask);
    reader.onloadend = () => {
      const base64data = reader.result.split(",")[1];

      const data = {
        char_id: drawingID,
        mask: base64data,
      };

      set_mask(data, (res) => {
        console.log("New mask loaded.");
      });
    };

    console.log(drawingID);
    const get_skeleton_req = {
      char_id: drawingID,
    };

    await get_skeleton(get_skeleton_req, (res) => {
      let skeleton = res.skeleton;
      dispatch(setSkeleton(skeleton));
    });

    console.log("Next Step await worked?");

    StepForward();
  };

  const instructions = {
    Title: "Select Character",
    PreText:
      "Upload drawing of ONE humanlike character. Make sure to not make the arms and legs overlap in the drawing.",
    Directions: [
      "Draw your character on a white background, like a piece of paper or white board. Make sure the background is as clean and smooth as possible.",
      "Make sure to take the picture of your drawing in a well lit area, and hold the camera further away to minimize shadows.",
      <div class="h-[600px] border overflow-y-auto mx-[-30px]"></div>,
    ],
  };

  return (
    <Fragment>
      <Instruction instructions={instructions}>
        <div ref={canvasWindow} className={classes["pre-img-box"]}>
          <MaskStage
            scale={imgScale}
            canvasWidth={cropped_image_dimensions.width}
            canvasHeight={cropped_image_dimensions.height}
            ref={layerRef}
          />
          <MaskingToolbar />
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

export default EditMask;
