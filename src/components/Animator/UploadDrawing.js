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
import {
  setImageDimenstions,
  setCoordinates,
  setDrawingUrl,
  setCurrentDrawingID,
} from "../../redux/DrawingStore";
import {
  setCurrentCharacterId,
  addCharacter,
  removeCharacter,
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../../redux/charactersLibrary";

const Characters = (props) => {
  const { StepForward, onFileChange, preview } = props;
  return (
    <div>
      <div className={classes["pre-img-box"]}>
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
          onChange={onFileChange}
          style={{ display: "none" }}
        />
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
  const [loading, setLoading] = useState(false);

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

  const onFileUpload = () => {
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

    handleFile(image); // Pass the image directly to handleFile
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
