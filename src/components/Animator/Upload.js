//import classes from "./Animator.module.css";
import Instruction from "./Instructions";
import classes from "./Upload.module.css";
import imgBackground from "../../assets/Background-1.png";
import imgFrame from "../../assets/Frame.png";
import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { upload_image } from "../../Utility/Api";
import { displayinCard } from "../../redux/imageSlice";
import { setCurrentCharacterId, addCharacter, removeCharacter, saveToLocalStorage, loadFromLocalStorage } from "../../redux/charactersLibrary";



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
  const [charachter, setCharacter] = useState(null);

  useEffect(() => {
    fetch(
      "https://pixabay.com/api/?key=38219264-01b184f5a26d1d3eb3f986ba8&q=background&image_type=photo"
    )
      .then((res) => res.json())
      .then((data) => setCharacter(data));
  }, []);
  const instructions = {
    Title: "Upload a character/Pick one",
    PreText:
      "Upload drawing of ONE humanlike character. Make sure to not make the arms and legs overlap in the drawing.",
    Directions: [
      "Draw your character on a white background, like a piece of paper or white board. Make sure the background is as clean and smooth as possible.",
      "Make sure to take the picture of your drawing in a well lit area, and hold the camera further away to minimize shadows.",
      <div class="h-[600px] border overflow-y-auto mx-[-30px]">
      <div class="grid grid-cols-3 gap-3">
        {charachter?.hits?.map((item) => {
          return (
            <div
              class="border-2 border-gray-300"
              // onClick={() => dispatch(displaybackground(item.largeImageURL))}
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
      </div>
    </div>,
    ],
  };
  const ActiveClassName = `${classes["steps-color"]} ${classes["active"]}`;
  const InActiveClassName = `${classes["steps-color"]}`;


  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

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
      const base64Data = reader.result.split(',')[1]; // Extract the base64 data portion

      console.log(base64Data);
      
      data['name'] = image.name;
      data['image_bytes'] = base64Data;
      upload_image(data, (res) => {
        const animation_1 = res['animation_1']
        const Char_id = res['Char_id']
        dispatch(setCurrentCharacterId(Char_id));
        dispatch(displayinCard(animation_1));
        dispatch(addCharacter(Char_id));
        props.StepForward();

      })
      // props.StepForward();
    };



    // after uploud
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
