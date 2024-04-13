import classes from "./Animator.module.css";
import Instructions from "./Instructions";
import { setWithBackgroundUrl } from "../../redux/DrawingStore";
import { useDispatch, useSelector } from "react-redux";
import { displaybackground } from "../../redux/DrawingStore";
import { final_render, upload_background } from "../../Utility/Api";
import imageCompression from "browser-image-compression";
import heic2any from "heic2any";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const selectable_backgrounds = [
  {
    id: 6,
    name: "white"
  },
  {
    id: 1,
    name: "Forest"
  },
  {
    id: 2,
    name: "Castle"
  },
  {
    id: 3,
    name: "House"
  },
  {
    id: 4,
    name: "Stage"
  },
]

const Backgrounds = (props) => {
  const combinedImageRef = useRef(null);
  const dispatch = useDispatch();



  const { current_animation_url, drawingID, backgroundUrl, } = useSelector((state) => state.image);
  const { StepForward, StepBackward, uploadedBackground, image } = props;

  // create ref for the animation preview
  // const animationPreviewRef = useRef(null);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const onFileUpload = async () => {
    // Check if image or character is selected, if not show alert and return
    if (!image) {
      alert("Please select a drawing to upload or a character");
      return;
    }
  
    // Show uploading alert
    Swal.fire({
      title: "Uploading Background...",
      html: "",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    // Wrap FileReader logic in a promise to wait for its completion
    const uploadPromise = new Promise((resolve, reject) => {
      if (image) {
        const data = {};
        const reader = new FileReader();
        reader.readAsDataURL(image);
  
        reader.onload = () => {
          const base64Data = reader.result.split(',')[1]; // Extract base64 data portion
          data['name'] = image.name;
          data['image_bytes'] = base64Data;
          upload_background(data, (res) => {
            const url = res['background_url'];
            dispatch(displaybackground(url));
            setUploadSuccessful(true);
            Swal.close();
            resolve(); // Resolve the promise here
          }, (error) => {
            Swal.close();
            reject(error); // Reject the promise on error
          });
        };
      }
    });
  
    // Return the promise so `generate_with_background` can await it
    return uploadPromise;
  };

  // useEffect(() => {
  //   dragElement(document.getElementById("animationPreview"));
  // }, [animationPreviewRef]);

  const dragElement = (elmnt) => {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt?.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt?.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      if (elmnt) elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // if element is not postioned on background then do not change position
      const background = document.getElementById("background");
      const backgroundx = background?.offsetLeft;
      const backgroundy = background?.offsetTop;
      const backgroundwidth = background?.offsetWidth;
      const backgroundheight = background?.offsetHeight;

      if (elmnt.offsetTop - pos2 < (backgroundy - 50) || elmnt.offsetTop - pos2 > (backgroundy + backgroundheight - elmnt.offsetHeight + 50)) {
        return;
      }
      if (elmnt.offsetLeft - pos1 < (backgroundx - 50) || elmnt.offsetLeft - pos1 > (backgroundx + backgroundwidth - elmnt.offsetWidth + 50)) {
        return;
      }
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  const generate_with_background = async () => {
    // call final render api with 
    // if background_url is null then do not send it, show error
    if (!backgroundUrl && !uploadedBackground) {
      alert("Please select a background");
      return;
    };
  
    if (uploadedBackground) {
      try {
        await onFileUpload(); // Await the completion of file upload
      } catch (error) {
        console.log("ISSUE WITH UPLOAD", error);
        return; // Exit if there's an upload error
      }
    }
  
    // Proceed with final render call
    const post_req = {
      gif_url: current_animation_url,
      char_id: drawingID,
      background_url: backgroundUrl,
    };
  
    Swal.fire({
      title: "Rendering Final Animation",
      html: "Please wait...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await final_render(post_req, (res) => {
      const new_animation_url = res['animation_url']
      dispatch(setWithBackgroundUrl(new_animation_url))
      // set_animating_in_progress(false);
      Swal.close();
      StepForward();
    }, () => {
      Swal.close();
      // set_animating_in_progress(false);
    })
  }
  return (
    <div>
      <div className={classes["pre-img-box"]}>
        <div className="relative" ref={combinedImageRef}>
          <img
            className={classes["pre-img"]}
            src={current_animation_url}
            alt="Animation preview"
          />
          {backgroundUrl && (
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundUrl})`, zIndex: -1 }}
              ></div>
            </div>
          )}
        </div>
      </div>
      <div className={classes["button-row"]}>
        <div className={classes["button-col"]}>
          <button className={classes["prev-btn"]} onClick={StepBackward}>
            Previous
          </button>
        </div>
        <div className={classes["button-col"]}>
          <button
            onClick={generate_with_background}
            className={classes["next-btn"]}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const Background = (props) => {
  const [backgrounds, setBackgrounds] = useState(null);
  const [uploadedBackground, setUploadedBackground] = useState(null);

  useEffect(() => {
    // fetch background from https://utoon-animator.s3.amazonaws.com/Background/{selectable_character.name}.png
    let background_url_list = []
    selectable_backgrounds.forEach((selectable_background) => {
      background_url_list.push(`https://utoon-animator.s3.amazonaws.com/Backgrounds/${selectable_background.name}.png`)
    })
    setBackgrounds(background_url_list);
  }, []);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [compressedImageUrl, setCompressedImageUrl] = useState(null);
  
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
      };
      let preview = URL.createObjectURL(newFile);
      setPreview(preview);
      setImage(newFile);
    } catch (err) {
      console.log(err);
    }
  };

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    if (file.type === "image/heic" || (file.name).toLowerCase().includes(".heic")) {
      await convertHeicformat(URL.createObjectURL(file));
    }
    if(file.type === "image/png" || file.type === "image/jpeg" || (file.name).toLowerCase().includes(".png") || (file.name).toLowerCase().includes(".jpg")){
      const compressOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 2000,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, compressOptions);
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
      dispatch(displaybackground(preview));
      const tempImage = new Image();
      setUploadedBackground(true)
      if (compressedUrl !== null && compressedUrl !== undefined) tempImage.src = compressedUrl;

      tempImage.onload = function (e) {
      };
    }
  };

  const dispatch = useDispatch();
  const instructions = {
    Title: "Background",
    PreText: "Select a background to set the scene",
    Directions: [
      <div class="h-[600px] border overflow-y-auto mx-[-30px]">
        <div class="grid grid-cols-3 gap-3">
          <div
            class="border-2 border-gray-300"
          >
            <label className={classes["pre-upload-btn"]} label="file">
              <input type="file" name="file" accept=".jpg, .png, .heic"  onChange={onFileChange} style={{display: 'none'}}/>
              <img src="https://utoon-animator.s3.amazonaws.com/Backgrounds/Plus.png" alt="Frame" />
              upload background
            </label>
          </div>
          {backgrounds?.map((item) => {
            return (
              <div
                class="border-2 border-gray-300"
                onClick={() => dispatch(displaybackground(item))}
              >
                <img
                  src={item}
                  alt=""
                  height={200}
                  width={200}
                  className="bg-auto bg-no-repeat bg-center"
                />
              </div>
            );
          })}
          {/* <div
            class="border-2 h-[150px] border-gray-300"
            onClick={() => dispatch(displaybackground(imgAnimate))}
          >
            <img
              src={imgAnimate}
              alt=""
              height={200}
              width={200}
              className="bg-auto bg-no-repeat bg-center"
            />
          </div> */}
        </div>
      </div>,
    ],
  };
  const ActiveClassName = `${classes["steps-color"]} ${classes["active"]}`;
  const InActiveClassName = `${classes["steps-color"]}`;
  const PrevActiveClassName = `${classes["steps-color"]} ${classes["prev-tab"]}`;

  return (
    <>
      <Instructions
        instructions={instructions}
        CSSClassNames1={PrevActiveClassName}
        CSSClassNames2={PrevActiveClassName}
        CSSClassNames3={ActiveClassName}
        CSSClassNames4={InActiveClassName}
        CSSClassNames5={InActiveClassName}
      >
        <Backgrounds
          StepForward={props.StepForward}
          StepBackward={props.StepBackward}
          uploadedBackground={uploadedBackground}
          image={image}
          preview={preview}
        />
      </Instructions>
    </>
  );
};

export default Background;
