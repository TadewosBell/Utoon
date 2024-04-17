import React from "react";
// import classnames from "classnames";
// import UndoIcon from "../../assets/customIcons/undo.svg";
// import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  setLines,
  setPenSize,
  setTool,
  setMaskBase64,
} from "../../redux/MaskEditorStore";

const MaskingToolbar = () => {
  const { tool, penSize, lines } = useSelector((state) => state.MaskEditor);

  const dispatch = useDispatch();

  const handleReset = () => {
    if (!lines.length) {
      return;
    }
    dispatch(setLines([]));
  };

  const handleUndo = () => {
    if (!lines.length) {
      return;
    }
    let newLines = lines.slice(0, -1);
    dispatch(setLines(newLines));
  };

  return (
    <div className=""
    style={{
      marginTop: '10px',
      marginBottom: '10px',
      // border radius 5px
      borderRadius: '10px',
      backgroundColor: 'white',
      maxWidth: '400px',
    }}
    >
      <div>
        <div>
          <button

            onClick={() => dispatch(setTool("pen"))}
          >
            <BsPenFill size={25} style={{
              marginRight: '10px',
              marginTop: '10px',
              backgroundColor: 'white',
              borderRadius: '5px',
            }} />
          </button>
          <button
            // className={classnames("sm-button-icon mr-2", {
            //   "bg-primary text-white": tool === "eraser",
            // })}
            onClick={() => dispatch(setTool("eraser"))}
          >
            <BsEraserFill size={25} style={{
              marginLeft: '10px',
              marginTop: '10px',
              backgroundColor: 'white',
              borderRadius: '5px',
            }} />
          </button>
          <div className="pens-wrapper">
            <form className="pens">
              <label className="label0 d-none d-md-block">
                <input
                  type="radio"
                  name="radio"
                  value={3}
                  checked={penSize === 3}
                  onChange={() => dispatch(setPenSize(3))}
                />
                Size 1
              </label>
              <label className="label1">
                <input
                  type="radio"
                  name="radio"
                  value={5}
                  checked={penSize === 5}
                  onChange={() => dispatch(setPenSize(5))}
                />
                Size 2
              </label>
              <label className="label2">
                <input
                  type="radio"
                  name="radio"
                  value={15}
                  checked={penSize === 15}
                  onChange={() => dispatch(setPenSize(15))}
                />
                Size 3
              </label>
              <label className="label3">
                <input
                  type="radio"
                  name="radio"
                  value={26}
                  checked={penSize === 26}
                  onChange={() => dispatch(setPenSize(26))}
                />
                Size 4
              </label>
              <label className="label4">
                <input
                  type="radio"
                  name="radio"
                  value={35}
                  checked={penSize === 35}
                  onChange={() => dispatch(setPenSize(35))}
                />
                Size 5
              </label>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div className="justify-content-end">
          <button className="sm-button-icon mr-2" onClick={handleUndo}>
            {/* <object
              data={UndoIcon}
              type="image/svg+xml"
              aria-label="undo_icon"
              style={{ pointerEvents: "none" }}
            ></object> */}
            Undo
          </button>

          <button className="md-button-reset p-0" onClick={handleReset}>
            Reset mask
          </button>
        </div>
      </div>
      <div class="w-80 rounded-lg bg-[#F6F4EB] p-6 shadow-lg">
        <div class="flex items-center justify-between">
          <div class="flex-col text-center">
            <div>
              <button class="fas fa-pen text-[#749BC2]"></button>
            </div>
            <div>
              <label for="">Paint</label>
            </div>
          </div>
          <div class="flex-col text-center">
            <div>
              <button class="fas fa-eraser text-red-500"></button>
            </div>
            <div>
              <label for="">Eraser</label>
            </div>
          </div>
          <div class="flex-col text-center">
            <div>
              <button class="fas fa-undo text-yellow-500"></button>
            </div>
            <div>
              <label for="">Undo</label>
            </div>
          </div>
          <div class="flex-col text-center">
            <div>
              <button class="fas fa-refresh text-red-600"></button>
            </div>
            <div>
              <label for="">Reset</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaskingToolbar;
