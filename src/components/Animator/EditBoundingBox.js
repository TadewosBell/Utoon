//import classes from "./Animator.module.css";
import Instruction from "./Instructions";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setCoordinates, setBoundingBox, setMaskUrl, setCroppedImageUrl, resetState } from "../../redux/DrawingStore";

import { set_bounding_box } from "../../Utility/Api";

import classes from "./Animator.module.css";
import BoundingBoxStage from "../Canvas/BoundingBoxStage";

const bounding_box_image = require("../../assets/Tutorial/Bounding_Box.JPG")

const calculateRatio = (
    canvasWidth,
    canvasHeight,
    oW, //Original image width
    oH //Original image height
  ) => {
    if (oH >= oW && canvasHeight >= canvasWidth) {
      return canvasHeight / oH < 1 ? canvasHeight / oH : 1;
    } else if (oH < oW && canvasHeight >= canvasWidth) {
      return canvasHeight / oW < 1 ? canvasHeight / oW : 1;
    } else if (oH >= oW && canvasHeight < canvasWidth) {
      return canvasWidth / oH < 1 ? canvasWidth / oH : 1;
    } else {
      return canvasWidth / oW < 1 ? canvasWidth / oW : 1;
    }
  };
// component with one one side showing directions and the other side showing an image of the character
// on the bottom there is a coursel of images of different characters

const EditBoundingBox = (props) => {

    const canvasWindow = useRef(null);
    const { StepForward, StepBackward } = props;
    const { drawingID, coordinates, boundingBox, imageDimenstions } = useSelector((state) => state.image);
    const dispatch = useDispatch();
    const [iWidth, setImageWidth] = useState(0);
    const [iHeight, setImageHeight] = useState(0);
    const [ratio, setRatio] = useState(0);

    useEffect(() => {
        const ratio = calculateRatio(
            canvasWindow.current?.offsetWidth - 20,
            canvasWindow.current?.offsetHeight - 20,
            imageDimenstions.width,
            imageDimenstions.height
        );

        const calculatedWidth = imageDimenstions.width * ratio;
        const calculatedHeight = imageDimenstions.height * ratio;
        setImageWidth(calculatedWidth);
        setImageHeight(calculatedHeight);
        setRatio(ratio);
        dispatch(setBoundingBox({
            x:
            coordinates.x1 * ratio +
              (canvasWindow.current?.offsetWidth / 2 - calculatedWidth / 2),
            width: coordinates.x2 * ratio - coordinates.x1 * ratio,
            y:
            coordinates.y1 * ratio +
              (canvasWindow.current?.offsetHeight / 2 - calculatedHeight / 2),
            height: coordinates.y2 * ratio - coordinates.y1 * ratio,
          }));
    }, [canvasWindow]);


    const NextStep = () => {
        let xOffset = canvasWindow.current?.offsetWidth / 2 - iWidth / 2;
        let yOffset = canvasWindow.current?.offsetHeight / 2 - iHeight / 2;
        const coordinates = {
          x1: Math.round(
            (boundingBox.x - xOffset) / ratio >= 0
              ? (boundingBox.x - xOffset) / ratio
              : 0
          ),
          x2: Math.round(
            boundingBox.width / ratio +
              boundingBox.x / ratio -
              xOffset / ratio
          ),
          y1: Math.round(
            (boundingBox.y - yOffset) / ratio >= 0
              ? (boundingBox.y - yOffset) / ratio
              : 0
          ),
          y2: Math.round(
            boundingBox.height / ratio +
              boundingBox.y / ratio -
              yOffset / ratio
          ),
        };

        dispatch(setCoordinates(coordinates));

        const data = {
            bbox: coordinates,
            char_id: drawingID,
        }

        Swal.fire({
          title: "Outlining Character...",
          html: "Please wait...",
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        set_bounding_box(data, (data) => {
            const cropped_image_url = data.cropped_image_url;
            const mask_url = data.mask_url;
            dispatch(setCroppedImageUrl(cropped_image_url));
            dispatch(setMaskUrl(mask_url));
            Swal.close();
            if(data.status === 'success') StepForward();
        });
        // StepForward();
    };

  const previousPressed = () => {
    dispatch(resetState());
    StepBackward();
  };


  const instructions = {
    Title: "Edit Bounding Box",
    PreText:
      "Use the bounding box to select the area of the image that you want to animate.",
    Directions: [
      "Select your drawing from the bottom carousel.",
      <div className="h-[600px] border overflow-y-auto mx-[-30px]">
        <img src={bounding_box_image} alt="" className={classes["tutorial_image"]} />
    </div>,
    ],

  };



  return (
    <Fragment>
      <Instruction
        instructions={instructions}
      >
        <div ref={canvasWindow} className={classes["pre-img-box"]}>
            <BoundingBoxStage
            canvasWidth={canvasWindow.current?.offsetWidth}
            canvasHeight={canvasWindow.current?.offsetHeight}
            imageWidth={iWidth}
            imageHeight={iHeight}
            />
        </div>
        <div className={classes["button-row"]}>
            <div className={classes["button-col"]}>
            <button className={classes["prev-btn"]} onClick={previousPressed}>
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

export default EditBoundingBox;
