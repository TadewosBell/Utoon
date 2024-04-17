//  Copyright (c) Meta Platforms, Inc. and affiliates.
//  This source code is licensed under the MIT license found in the
//  LICENSE file in the root directory of this source tree.

import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Circle from "./Pose/Circle";
import Line from "./Pose/Line";

export default function JointEditor({ imageUrl, imageHeight, imageWidth, originalPoints, scale, setSkeleton }) {
    const dispatch = useDispatch();

    const [points, setPoints] = useState(() =>
        JSON.parse(JSON.stringify(originalPoints))
    );

    const [hoveredJoint, setHoveredJoint] = React.useState(null);
    const [isMoving, setIsMoving] = React.useState(false);

    useEffect(() => {
        setSkeleton(points)
        }, [points])

  return (
    <div className="mx-auto my-auto" style={{alignContent: "center"}}>
        <div style={{ position: "absolute",alignContent: "center" }}>
          <img
            src={imageUrl}
            style={{ height: imageHeight * scale, width: imageWidth * scale }}
          />
        </div>
        <div style={{ position: "absolute", alignContent: "center" }}>
          <svg
            style={{ width: imageWidth * scale, height: imageHeight *scale }}
            viewBox={`0 0 ${imageWidth} ${imageHeight}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            {points.map((pt) => {
              if (!pt.parent) return;
              let parent = points.find((p) => p.name === pt.parent);

              return (
                <Line
                  key={`${pt.name}-${pt.parent}`}
                  x1={pt.loc[0]}
                  y1={pt.loc[1]}
                  x2={parent.loc[0]}
                  y2={parent.loc[1]}
                  isActive={
                    isMoving && [pt.name, pt.parent].indexOf(hoveredJoint) >= 0
                  }
                />
              );
            })}
            {points.map((pt) => (
              <Circle
                key={pt.name}
                cx={pt.loc[0]}
                cy={pt.loc[1]}
                xBounds={[0, imageWidth]}
                yBounds={[0, imageHeight]}
                onPositionUpdate={(pos) => {
                  const newPos = [pos.x, pos.y];
                  const newPts = points.map((p) =>
                    p.name !== pt.name ? p : { ...p, loc: newPos }
                  );
                  setPoints(newPts);
                  setIsMoving(pos.active);
                  dispatch(setSkeleton(newPts));
                }}
                onHover={(enter) => {
                  setHoveredJoint(enter ? pt.name : null);
                }}
                strokeWidth="10"
                stroke="white"
                r="4"
              />
            ))}
          </svg>
          {hoveredJoint ? (
            <div className="tooltip">
              {hoveredJoint?.replace("l_", "left ")?.replace("r_", "right ").replace("_", " ")}
            </div>
          ) : null}
        </div>
    </div>
  );
}
