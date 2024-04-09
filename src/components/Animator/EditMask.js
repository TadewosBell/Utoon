//import classes from "./Animator.module.css";
import Instruction from "./Instructions";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { setCoordinates, setBoundingBox, setCroppedImageDimensions, setSkeleton, setCurrentAnimationUrl } from "../../redux/DrawingStore";
import { setMaskBase64 } from "../../redux/MaskEditorStore";
import { intial_animation, get_skeleton, set_mask } from "../../Utility/Api";
import { addCharacter } from "../../redux/charactersLibrary";
import { calculateRatio, resizedataURL, mapJointsToPose } from "../../Utility/Helper";
import MaskStage from "../Canvas/MaskStage";

import classes from "./Animator.module.css";
import MaskingToolbar from "../Canvas/MaskingToolbar";
// component with one one side showing directions and the other side showing an image of the character
// on the bottom there is a coursel of images of different characters

const masking_tutorial = require("../../assets/Tutorial/Mask_Tutorial.gif")

const EditMask = (props) => {

    const canvasWindow = useRef(null);
    const { StepForward, StepBackward } = props;
    const { drawingID, cropped_image_url, cropped_image_dimensions } = useSelector((state) => state.image);
    const dispatch = useDispatch();
    const layerRef = useRef(null);
    const [imgScale, setImgScale] = useState(0);
    const [triedTwice, setTriedTwice] = useState(false);

    useEffect(() => {
      // get cropped image dimensions from image
      const cropped_image = new Image();
      if(cropped_image_url !== null && cropped_image_url !== undefined)
        cropped_image.src = cropped_image_url; // cropped image base64
      cropped_image.onload = () => {
        if(canvasWindow.current) {
          dispatch(setCroppedImageDimensions({
            width: cropped_image.naturalWidth,
            height: cropped_image.naturalHeight
          }));

          const ratio = calculateRatio(
            canvasWindow.current.offsetWidth - 45, // Toolbar Offset
            canvasWindow.current.offsetHeight - 45, // Toolbar Offset
            cropped_image.naturalWidth,
            cropped_image.naturalHeight
          );
          setImgScale(ratio);
        }
      }
    }, [canvasWindow]);


    const NextStep = async () => {
      const uri = layerRef.current?.toDataURL();
      const newDataUri = await resizedataURL(
        uri,
        cropped_image_dimensions.width,
        cropped_image_dimensions.height
      );
      setMaskBase64(newDataUri); // base64
      Swal.fire({
        title: "Animating Character",
        imageUrl: require("../../assets/Animations/astro_YMCA.gif"),
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

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
        const base64data = reader.result.split(',')[1]; 

        const data = {
          'char_id': drawingID,
          'mask': base64data,
        }

        set_mask(data, (res) => {
          console.log("New mask loaded.");
        });

      }

      console.log(drawingID)
      const get_skeleton_req = {
        'char_id': drawingID,
      }

      await get_skeleton(get_skeleton_req, (res) => {
        let skeleton = res.skeleton;
        dispatch(setSkeleton(skeleton));
      })

      const intial_animation_req = {
        char_id: drawingID,
      };

      console.log("INITIAL ANIMATION REQ REACHED: ", intial_animation_req)
      await intial_animation(intial_animation_req, (res) => {
        const animation_1 = res['animation_url']
        const Char_id = res['char_id']
        dispatch(setCurrentAnimationUrl(animation_1));
        dispatch(addCharacter(Char_id));
        console.log("intial_animation", res)
        StepForward();
      }, () => {
        console.log("intial_animation failed")
        // retry animation
        if(!triedTwice){
          setTriedTwice(true);
          // delay untill setTriedTwice is set to true
          setTimeout(() => {
          NextStep();
          }, 1000);
        }
      })

      console.log("Next Step await worked?")
      Swal.close();

    };

  const instructions = {
    Title: "Select Character",
    PreText:
      "Select the body of the character you want to animate.",
    Directions: [
      "Use Pen to select the body of the character you want to animate.",
      "Use eraser to remove any unwanted selections.",
      <div class="h-[600px] border overflow-y-auto mx-[-30px]">
        <img src={masking_tutorial} alt="" className={classes["tutorial_image"]} />
    </div>,
    ],
  };

  return (
    <Fragment>
      <Instruction
        instructions={instructions}
      >
        <div ref={canvasWindow} className={classes["pre-img-box"]}>
        <MaskingToolbar />

          <div className={classes["canvas-wrapper"]}>
            
            <div className={classes["mask-tool-rapper"]}>
              <MaskStage
                scale={imgScale}
                canvasWidth={cropped_image_dimensions.width}
                canvasHeight={cropped_image_dimensions.height}
                ref={layerRef}
              />
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

export default EditMask;
