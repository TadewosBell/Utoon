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
    <div className="mx-0 tools-wrapper">
      <div>
        <div>
          <button
            // className={classnames("sm-button-icon mr-2", {
            //   "bg-primary text-white": tool === "pen",
            // })}
            onClick={() => dispatch(setTool("pen"))}
          >
            Pen
          </button>
          <button
            // className={classnames("sm-button-icon mr-2", {
            //   "bg-primary text-white": tool === "eraser",
            // })}
            onClick={() => dispatch(setTool("eraser"))}
          >
            Eraser
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
                <span></span>
              </label>
              <label className="label1">
                <input
                  type="radio"
                  name="radio"
                  value={5}
                  checked={penSize === 5}
                  onChange={() => dispatch(setPenSize(5))}
                />
                <span></span>
              </label>
              <label className="label2">
                <input
                  type="radio"
                  name="radio"
                  value={15}
                  checked={penSize === 15}
                  onChange={() => dispatch(setPenSize(15))}
                />
                <span></span>
              </label>
              <label className="label3">
                <input
                  type="radio"
                  name="radio"
                  value={26}
                  checked={penSize === 26}
                  onChange={() => dispatch(setPenSize(26))}
                />
                <span></span>
              </label>
              <label className="label4">
                <input
                  type="radio"
                  name="radio"
                  value={35}
                  checked={penSize === 35}
                  onChange={() => dispatch(setPenSize(35))}
                />
                <span></span>
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
    </div>
  );
};

export default MaskingToolbar;
