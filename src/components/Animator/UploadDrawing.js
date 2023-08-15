//import classes from "./Animator.module.css";
import Instruction from "./Instructions";
import classes from "./Upload.module.css";
import imgBackground from "../../assets/Background-1.png";
import imgFrame from "../../assets/Frame.png";
import React, { Fragment, useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import heic2any from "heic2any";
import { useSelector, useDispatch } from "react-redux";
import { upload_image, get_bounding_box } from "../../Utility/Api";
import { setImageDimenstions, setCoordinates, setDrawingUrl, setCurrentDrawingID } from "../../redux/DrawingStore";
import { setCurrentCharacterId, addCharacter, removeCharacter, saveToLocalStorage, loadFromLocalStorage } from "../../redux/charactersLibrary";

const selectable_characters = [
  {
    id: 1,
    name: "Bella"
  },
  {
    id: 2,
    name: "Donny"
  },
]

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
        <input type="file" name="file" accept=".jpg, .png, .heic"  onChange={onFileChange} style={{display: 'none'}}/>
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
  const [character, setCharacter] = useState([]);
  const [character_selected, setCharacterSelected] = useState(null);


  useEffect(() => {
    // fetch characters from https://utoon-animator.s3.amazonaws.com/characters/{selectable_character.name}.png
    let character_url_list = []
    selectable_characters.forEach((selectable_character) => {
      console.log(`https://utoon-animator.s3.amazonaws.com/Characters/${selectable_character.name}.png`)
      character_url_list.push(`https://utoon-animator.s3.amazonaws.com/Characters/${selectable_character.name}.png`)
    })
    setCharacter(character_url_list)
  }, []);

  const onCharacterClick = async (image_url) => {
    console.log(image_url);
    const arrayBuffer = await (await fetch(image_url)).arrayBuffer();
    const base64Data = btoa(
      new Uint8Array(arrayBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    const newFile = new File([base64Data], "drawing.png", {
      type: "image/png",
      lastModified: new Date().getTime(),
    });

    // Update the state
    setImage(newFile);

    const tempImage = new Image();
    if (image_url !== null && image_url !== undefined) tempImage.src = image_url;

    tempImage.onload = function (e) {
      dispatch(setImageDimenstions({
        width: tempImage.naturalWidth,
        height: tempImage.naturalHeight,
      }));
    };

    setCharacterSelected(image_url);
    setPreview(image_url);
  }

  const instructions = {
    Title: "Upload a character/Pick one",
    PreText:
      "Upload drawing of ONE humanlike character. Make sure to not make the arms and legs overlap in the drawing.",
    Directions: [
      "Draw your character on a white background, like a piece of paper or white board. Make sure the background is as clean and smooth as possible.",
      "Make sure to take the picture of your drawing in a well lit area, and hold the camera further away to minimize shadows.",
      <div key="direciton_div" class="h-[600px] border overflow-y-auto mx-[-30px]">
      <div class="grid grid-cols-3 gap-3">
        {character?.map((item) => {
          return (
            <div
              class="border-2 border-gray-300"
              onClick={() => onCharacterClick(item)}
              key={item.id}
            >
              <img
                key={item}
                src={item}
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
  const [compressedImageUrl, setCompressedImageUrl] = useState(null);
  const dispatch = useDispatch();


  const convertHeicformat = async (heicURL) => {
    try {
      const res = await fetch(heicURL);
      const blob = await res.blob();
      const conversionResult = await heic2any({
        blob,
        toType: "image/jpeg",
        quality: 0.1,
      });
      const imgUrl = URL.createObjectURL(conversionResult);
      let newFile = new File([conversionResult], "drawing.png", {
        type: "image/png",
        lastModified: new Date().getTime(),
      });
      
      const tempImage = new Image();
      if (imgUrl !== null && imgUrl !== undefined) tempImage.src = imgUrl;
  
      tempImage.onload = function (e) {
        dispatch(setImageDimenstions({
          width: tempImage.naturalWidth,
          height: tempImage.naturalHeight,
        }));
      };
      let preview = URL.createObjectURL(newFile);
      setPreview(preview);
      setImage(newFile);
    } catch (err) {
      console.log(err);
    }
  };

  const onFileChange = async (event) => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    if (file.type === "image/heic" || (file.name).toLowerCase().includes(".heic")) {
      await convertHeicformat(URL.createObjectURL(file));
    }
    if(file.type === "image/png" || file.type === "image/jpeg" || (file.name).toLowerCase().includes(".png") || (file.name).toLowerCase().includes(".jpg")){
      console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
      const compressOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 2000,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, compressOptions);
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
      const compressedUrl = URL.createObjectURL(compressedFile);
      setCompressedImageUrl(compressedUrl);
      let newFile = new File([compressedFile], "drawing.png", {
        type: "image/png",
        lastModified: new Date().getTime(),
      });
      // Update the state
      setImage(newFile);
      let preview = URL.createObjectURL(file);
      setPreview(preview);
      const tempImage = new Image();
      if (compressedUrl !== null && compressedUrl !== undefined) tempImage.src = compressedUrl;

      tempImage.onload = function (e) {
        dispatch(setImageDimenstions({
          width: tempImage.naturalWidth,
          height: tempImage.naturalHeight,
        })
        );
      };
    }
  };


  const onFileUpload = async () => {
 
    // Create an object of formData
    if(character_selected){
      // get image bytes from character_selected url 
      const data = {}
      console.log(character_selected)
      const arrayBuffer = await (await fetch(character_selected)).arrayBuffer();
      const base64Data = btoa(
        new Uint8Array(arrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      get_bounding_box({image_bytes: base64Data}, (res) => {
        const drawing_url = res['drawing_url']
        const Char_id = res['char_id']
        const bounding_box = res['bounding_box'];
        console.log(bounding_box)
        dispatch(setCurrentDrawingID(Char_id));
        dispatch(setDrawingUrl(drawing_url));
        dispatch(setCoordinates(bounding_box));
        props.StepForward();
      })
    }
    else {
      const data = {}
    

      const reader = new FileReader();
      reader.readAsDataURL(image);
  
      reader.onload = () => {
        const base64Data = reader.result.split(',')[1]; // Extract the base64 data portion
  
        
        data['name'] = image.name;
        data['image_bytes'] = base64Data;
        get_bounding_box(data, (res) => {
          const drawing_url = res['drawing_url']
          const Char_id = res['char_id']
  
          const bounding_box = res['bounding_box'];
          console.log(bounding_box)
          dispatch(setCurrentDrawingID(Char_id));
          dispatch(setDrawingUrl(drawing_url));
          dispatch(setCoordinates(bounding_box));
          props.StepForward();
  
        })
        // props.StepForward();
      };
    }



    // after uploud
    // props.StepForward();
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
