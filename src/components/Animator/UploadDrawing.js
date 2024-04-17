//import classes from "./Animator.module.css";
import Instruction from "./Instructions";
import classes from "./Upload.module.css";
import imgBackground from "../../assets/Background-1.png";
import imgFrame from "../../assets/Frame.png";
import React, { Fragment, useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import heic2any from "heic2any";
import Swal from "sweetalert2"; // Import Swal from SweetAlert2

import { useSelector, useDispatch } from "react-redux";
import { upload_image, get_bounding_box } from "../../Utility/Api";
import { setImageDimenstions, setCoordinates, setDrawingUrl, setCurrentDrawingID } from "../../redux/DrawingStore";
import Swal from "sweetalert2";
import { BsUpload } from "react-icons/bs";

const selectable_characters = [
  {
    id: 1,
    name: "Bella.png"
  },
  {
    id: 2,
    name: "Donny.png"
  },
  {
    id: 9,
    name: "Piggy.png"
  },
  {
    id: 4,
    name: "Emily.png"
  },
  {
    id: 5,
    name: "Ginger.jpg"
  },
  {
    id: 6,
    name: "Tommy.png"
  },
]

const Characters = (props) => {
  const { StepForward, onFileChange, preview } = props;
  const fileInputRef = React.useRef(null);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleUploadBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    onFileChange(e);
  };

  return (
    <div>
      <div className={classes["pre-img-box"]}>
        {preview ? <img
          className={classes["pre-img"]}
          src={preview ? preview : imgBackground}
          alt="Animation preview"
        /> : <div
          className={`${classes["upload-img-box"]} ${isDragOver ? "drag-over" : ""}`}
          onClick={handleUploadBoxClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Click and upload image or Drag/Drop</p>
          <BsUpload size={70} />

          <p>to upload your character</p>
        </div>}

      </div>
      <label className={classes["pre-upload-btn"]} label="file"/>
        <input
          type="file"
          name="file"
          accept=".jpg, .png, .heic"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
        <img src={imgFrame} alt="Frame" />
      <input type="file" name="file" id="file" /> <br />
      <div className={classes["button-row"]}>
        <div className={classes["button-col"]}>
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
  const [character_selected, setCharacterSelected] = useState(null);

  const [loading, setLoading] = useState(false);

  const [character, setCharacter] = useState(null);

  useEffect(() => {
    // fetch characters from https://utoon-animator.s3.amazonaws.com/characters/{selectable_character.name}.png
    let character_url_list = []
    selectable_characters.forEach((selectable_character) => {
      // character_url_list.push(`https://utoon-animator.s3.amazonaws.com/Characters/${selectable_character.name}.png`)
      character_url_list.push(selectable_character.name);
    })
    setCharacter(character_url_list)
  }, []);

  const onCharacterClick = async (character_name) => {
    setCharacterSelected(character_name);
    setPreview(`https://utoon-animator.s3.amazonaws.com/Characters/${character_name}`);
    // get image dimensions from url
    const tempImage = new Image();
    tempImage.src = `https://utoon-animator.s3.amazonaws.com/Characters/${character_name}`;
    tempImage.onload = function (e) {
      dispatch(setImageDimenstions({
        width: tempImage.naturalWidth,
        height: tempImage.naturalHeight,
      })
      );
    };
    tempImage.onerror = function (e) {
      console.log(e)
    }
  }


  const instructions = {
    Title: "Upload a character/Pick one",
    PreText:
      "Upload drawing of ONE character at a time.",
    Directions: [
      "Make sure to take the picture of your character in a well lit area, and hold the camera further away to minimize shadows.",
      "Keep any identifiable of personal information out of the picture.",
      <div key="direciton_div" className="h-[600px] border overflow-y-auto mx-[-30px]">
        <div className="grid grid-cols-3 gap-3">
          {character?.map((item) => {
            return (
              <div
                className="border-2 border-gray-300"
                onClick={() => onCharacterClick(item)}
                key={item.id}
              >
                <img
                  key={item}
                  src={`https://utoon-animator.s3.amazonaws.com/Characters/${item}`}
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
  const [dragging, setDragging] = useState(false);
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
        dispatch(
          setImageDimenstions({
            width: tempImage.naturalWidth,
            height: tempImage.naturalHeight,
          })
        );
      };
      let preview = URL.createObjectURL(newFile);
      setPreview(preview);
      setImage(newFile);
    } catch (err) {
      console.log(err);
    }
  };


  const onDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => {
    setDragging(false);
  };

  const onDrop = async (event) => {
    event.preventDefault();
    setDragging(false);

    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles && droppedFiles.length > 0) {
      const file = droppedFiles[0];
      await handleFile(file);
    }
  };

  const handleFile = async (file) => {
    console.log(file);
    
    if (
      file.type === "image/heic" ||
      file.name.toLowerCase().includes(".heic")
    ) {
      await convertHeicformat(URL.createObjectURL(file));
    }
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.name.toLowerCase().includes(".png") ||
      file.name.toLowerCase().includes(".jpg")
    ) {
      console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
      const compressOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 2000,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, compressOptions);
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      );
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
      if (compressedUrl !== null && compressedUrl !== undefined)
        tempImage.src = compressedUrl;

      tempImage.onload = function (e) {
        dispatch(
          setImageDimenstions({
            width: tempImage.naturalWidth,
            height: tempImage.naturalHeight,
          })
        );
      };

    }
  };


  const onFileUpload = async () => {
        // Create an object of formData
        Swal.fire({
          title: "Uploading...",
          html: "Please wait...",
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

    // if image or character selected is null, show alert and return
    if (!image && !character_selected) {
      alert("Please select a drawing to upload or a character");
      return;
    }

    Swal.fire({
      title: "Uploading...",
      html: "The server is starting up. This may take around 1-2 minutes.",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Create an object of formData
    if (character_selected) {
      // get image bytes from character_selected url 
      const data = {}
      data['character_selected'] = character_selected;
      get_bounding_box(data, (res) => {
        const drawing_url = res['drawing_url']
        const Char_id = res['char_id']
        const bounding_box = res['bounding_box'];
        dispatch(setCurrentDrawingID(Char_id));
        dispatch(setDrawingUrl(drawing_url));
        dispatch(setCoordinates(bounding_box));
        // close Swal
        Swal.close();
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
          dispatch(setCurrentDrawingID(Char_id));
          dispatch(setDrawingUrl(drawing_url));
          dispatch(setCoordinates(bounding_box));
          // close Swal
          Swal.close();

          props.StepForward();

        })
        // props.StepForward();
      };
    }
  };



    // after uploud
    // props.StepForward();
  // const onFileUpload = () => {
  //   // Create an object of formData
  //   Swal.fire({
  //     title: "Uploading...",
  //     html: "Please wait...",
  //     allowEscapeKey: false,
  //     allowOutsideClick: false,
  //     didOpen: () => {
  //       Swal.showLoading();
  //     },
  //   });

  //   handleFile(image); // Pass the image directly to handleFile
  // };

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
        <div>
          <div
            className={`${classes["pre-img-box"]} ${
              dragging ? classes["dragging"] : ""
            }`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <img
              className={classes["pre-img"]}
              src={preview ? preview : imgBackground}
              alt="Animation preview"
            />
          </div>
          <label className={classes["pre-upload-btn"]} label="file">
            <input
              type="file"
              name="file"
              accept=".jpg, .png, .heic"
              onChange={handleFile}
              style={{ display: "none" }}
            />
            <img src={imgFrame} alt="Frame" />
            upload creation
          </label>
          <input type="file" name="file" id="file" /> <br />
          <div className={classes["button-row"]}>
            <div className={classes["button-col"]}></div>
            <div className={classes["button-col"]}>
              <button onClick={onFileUpload} className={classes["next-btn"]}>
                Next
              </button>
            </div>
          </div>
        </div>
      </Instruction>
    </Fragment>

  );
};

export default Upload;
