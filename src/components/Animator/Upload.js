//import classes from "./Animator.module.css";
import Instruction from "./Instructions";
import classes from "./Upload.module.css";
import imgBackground from "../../assets/Background-1.png";
import imgFrame from "../../assets/Frame.png";
import React, { Fragment, useState } from "react";
import { upload_image } from "../../Utility/Api";

const Characters = (props) => {
  const { StepForward, onFileChange, preview } = props;
  return (
    <div>
      <div className={classes["pre-img-box"]}>
        <img
          className={classes["pre-img"]}
          src={preview? preview:imgBackground}
          alt="Animation preview"
        />
      </div>
      <label className={classes["pre-upload-btn"]} label="file">
        <input type="file" name="file" accept=".jpg, .png, .heic" onChange={onFileChange} style={{display: 'none'}}/>
        <img src={imgFrame} alt="Frame" />
        upload creation
      </label>
      <input type="file" name="file" id="file" /> <br />
      <div className={classes["button-row"]}>
        <div className={classes["button-col"]}>
          {/* <button className={classes["prev-btn"]}>Previous</button> */}
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

// component with one one side showing directions and the other side showing an image of the character
// on the bottom there is a coursel of images of different characters

const Upload = (props) => {
  const instructions = {
    Title: "Upload a character/Pick one",
    PreText:
      "Upload drawing of ONE humanlike character. Make sure to not make the arms and legs overlap in the drawing.",
    Directions: [
      "Draw your character on a white background, like a piece of paper or white board. Make sure the background is as clean and smooth as possible.",
      "Make sure to take the picture of your drawing in a well lit area, and hold the camera further away to minimize shadows.",
      "Keep any identifiable of personal information out of the picture.",
    ],
  };
  const ActiveClassName = `${classes["steps-color"]} ${classes["active"]}`;
  const InActiveClassName = `${classes["steps-color"]}`;

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    // Update the state
    setImage(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const onFileUpload = () => {
 
    // Create an object of formData
    const data = {}

    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = () => {
      console.log(reader.result);
      data['name'] = image.name;
      data['image_bytes'] = reader.result;
      upload_image(data, (res) => {
        console.log(res);
      })
    };



    // after uploud
    props.StepForward();
  };







  return (
    <Fragment>
      <Instruction
        instructions={instructions}
        CSSClassNames1={ActiveClassName}
        CSSClassNames2={InActiveClassName}
        CSSClassNames3={InActiveClassName}
        CSSClassNames4={InActiveClassName}
        CSSClassNames5={InActiveClassName}
      >
        <Characters StepForward={onFileUpload} onFileChange={onFileChange} preview={preview} />
      </Instruction>
    </Fragment>
  );
};

export default Upload;
