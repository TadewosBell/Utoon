import React, { useEffect, useRef, Fragment } from "react";
import { Stage, Layer, Image, Rect, Transformer } from "react-konva";
import useImage from "use-image";
import { useSelector, useDispatch } from "react-redux";
import { setImageDimenstions, setXyxyBB, setBoundingBox } from "../../redux/DrawingStore";

const DrawingImage = ({ urlImg, height, width, canvasWidth, canvasHeight }) => {
  const [image] = useImage(urlImg, "anonymous");
  return (
    <Image
      image={image}
      width={width || 0}
      height={height || 0}
      x={canvasWidth / 2 - (width || 0) / 2}
      y={canvasHeight / 2 - (height || 0) / 2}
    />
  );
};

const Annotation = ({
  shapeProps,
  isSelected,
  canvasWidth,
  canvasHeight,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef();
  const transformRef = useRef();

  useEffect(() => {
    if (isSelected) {
      transformRef.current.nodes([shapeRef.current]);
      transformRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const onMouseEnter = (event) => {
    event.target.getStage().container().style.cursor = "move";
  };

  const onMouseLeave = (event) => {
    event.target.getStage().container().style.cursor = "crosshair";
  };

  const limitBoundingBox = (pos) => {
    const node = shapeRef.current;
    const newRect = node.getClientRect();
    let newPos = { ...pos };
    if (pos.x < 0) {
      newPos.x = 0;
    }
    if (pos.y < 0) {
      newPos.y = 0;
    }
    if (pos.x + newRect.width > canvasWidth) {
      newPos.x = canvasWidth - newRect.width;
    }
    if (pos.y + newRect.height > canvasHeight) {
      newPos.y = canvasHeight - newRect.height;
    }
    return newPos;
  };

  return (
    <Fragment>
      <Rect
        ref={shapeRef}
        fill="white" // Use destination-out to mock transparency.
        globalCompositeOperation="destination-out"
        stroke="#3D92C7"
        onMouseDown={onSelect}
        onTap={onSelect}
        {...shapeProps}
        draggable
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onDragEnd={(event) => {
          onChange({
            ...shapeProps,
            x: event.target.x(),
            y: event.target.y(),
          });
        }}
        onTransformEnd={(event) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
        dragBoundFunc={(pos) => limitBoundingBox(pos)}
      />
      <Transformer
        ref={transformRef}
        rotateEnabled={false}
        borderStroke="#3D92C7"
        borderStrokeWidth={4}
        anchorFill="white"
        anchorCornerRadius={5}
        boundBoxFunc={(oldBox, newBox) => {
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          return newBox;
        }}
      />
    </Fragment>
  );
};

const BoundingBoxStage = ({
  canvasWidth,
  canvasHeight,
  imageWidth,
  imageHeight,
}) => {
  const { drawing_url, boundingBox } = useSelector((state) => state.image);;
  const dispatch = useDispatch();

  const handleMouseEnter = (event) => {
    event.target.getStage().container().style.cursor = "crosshair";
  };

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      return;
    }
  };

  return (
    <div className="div-fade">
      <Stage
        width={canvasWidth}
        height={canvasHeight || 0}
        onMouseEnter={handleMouseEnter}
        onTouchStart={checkDeselect}
      >
        <Layer>
          <DrawingImage
            urlImg={drawing_url}
            width={imageWidth}
            height={imageHeight}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
          />
        </Layer>
        <Layer>
          <Rect
            fill="dark"
            x={10}
            y={10}
            width={canvasWidth - 20 || 20}
            height={canvasHeight - 20 || 20}
            opacity={0.6}
          />
          <Annotation
            shapeProps={boundingBox}
            isSelected={true}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            onChange={(newAttrs) => {
              dispatch(setBoundingBox(newAttrs));
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default BoundingBoxStage;
