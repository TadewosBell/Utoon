import React, { useRef, forwardRef } from "react";
import { Stage, Layer, Line, Image } from "react-konva";
import useImage from "use-image";

import { useSelector, useDispatch } from "react-redux";

import { setLines } from "../../redux/MaskEditorStore";

// import useDrawingStore from "../../hooks/useDrawingStore";
// import useMaskingStore from "../../hooks/useMaskingStore";

const MaskImage = ({ urlImg, height, width }) => {
  const [image] = useImage(urlImg, "anonymous");
  return (
    <Image
      image={image}
      width={width || 0}
      height={height || 0}
      x={0}
      y={0}
      opacity={1}
    />
  );
};

const DrawingImage = ({ urlImg, height, width }) => {
  const [image] = useImage(urlImg, "anonymous");
  return (
    <Image
      image={image}
      width={width || 0}
      height={height || 0}
      x={0}
      y={0}
      opacity={0.5}
    />
  );
};

export const MaskPlaceHolder = forwardRef(
  ({ scale, canvasWidth, canvasHeight }, ref) => {
    const { cropped_image_url, mask_url } = useSelector((state) => state.image);
    const { lines } = useSelector((state) => state.MaskEditor);

    return (
      <div className="ml-auto mr-auto">
        <Stage
          width={canvasWidth * scale}
          height={canvasHeight * scale}
          scale={{ x: scale, y: scale }}
        >
          <Layer ref={ref}>
            <MaskImage
              urlImg={mask_url}
              height={canvasHeight}
              width={canvasWidth}
            />
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.tool === "eraser" ? "dark" : "white"}
                strokeWidth={line.penSize}
                tension={0.5}
                lineCap="round"
              />
            ))}
          </Layer>
          <Layer>
            <DrawingImage
              urlImg={cropped_image_url}
              height={canvasHeight}
              width={canvasWidth}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
);

const MaskStage = React.forwardRef(
  ({ scale, canvasWidth, canvasHeight }, ref) => {
    const isDrawing = useRef(false);
    const { cropped_image_url, mask_url } = useSelector((state) => state.image);
    let {
      tool,
      penSize,
      lines,
    } = useSelector((state) => state.MaskEditor);

    const dispatch = useDispatch();

    const handleMouseDown = (e) => {
      isDrawing.current = true;
      const pos = e.target.getStage().getRelativePointerPosition();

      // dispatch(setLines([...lines, { tool, penSize, points: [pos.x, pos.y] }]));
      dispatch(
        setLines(
          lines.concat({
            tool,
            penSize,
            points: [pos.x, pos.y],
          })
        )
      );
    };

    const handleMouseMove = (e) => {
      if (!isDrawing.current) {
        return;
      }
      const stage = e.target.getStage();
      const point = stage.getRelativePointerPosition();
      let tempLine = [... lines]
      let lastLine = {...lines[lines.length - 1]};
      console.log(lastLine, lines);
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      tempLine.splice(lines.length - 1, 1, lastLine);
      dispatch(setLines(tempLine.concat()));
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
    };

    const onMouseLeave = () => {
      isDrawing.current = false;
    };

    return (
      <div className="mx-auto my-auto">
        <Stage
          width={canvasWidth * scale}
          height={canvasHeight * scale}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onMousemove={handleMouseMove}
          onTouchMove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchEnd={handleMouseUp}
          onMouseLeave={onMouseLeave}
          scale={{ x: scale, y: scale }}
        >
          <Layer ref={ref}>
            <MaskImage
              urlImg={mask_url}
              height={canvasHeight}
              width={canvasWidth}
            />
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.tool === "eraser" ? "dark" : "white"}
                strokeWidth={line.penSize}
                tension={0.5}
                lineCap="round"
              />
            ))}
          </Layer>
          <Layer>
            <DrawingImage
              urlImg={cropped_image_url}
              height={canvasHeight}
              width={canvasWidth}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
);

export default MaskStage;
