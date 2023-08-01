import React, { useEffect, useRef, useState } from 'react';
import { parseGIF, decompressFrames } from 'gifuct-js';

const GifCanvas = ({gifUrl}) => {
    const canvasRef = useRef(null);
    const gifCanvasRef = useRef(null);
    let gifCtx = null;
    let playing = true; // Autoplay the gif
  
    let gifData = null;
    let gifFrames = [];
    let currentFrame = 0;
    let gifInterval;
    let loadedFrames;
    let frameIndex;
    let pixelPercent = 100;
    let frameImageData;
    const [zoom, setZoom] = useState(1);
    let position = { x: 0, y: 0 };

    const [positionX, setPositionX] = useState(null);
    const [positionY, setPositionY] = useState(null);
    const [changedPos, setChangedPos] = useState(false);

    const [defaultPositionX, setDefaultPositionX] = useState(0);
    const [defaultPositionY, setDefaultPositionY] = useState(0);

    const drawPatch = (frame) => {
        const dims = frame.dims;
        if (
          !frameImageData ||
          dims.width !== frameImageData.width ||
          dims.height !== frameImageData.height
        ) {
          canvasRef.current.width = dims.width;
          canvasRef.current.height = dims.height;
          gifCanvasRef.current.width = dims.width;
          gifCanvasRef.current.height = dims.height;
          frameImageData = canvasRef.current.getContext('2d').createImageData(
            dims.width,
            dims.height
          );
        }
        if(changedPos == false){
            setPositionX(dims.left);
            setPositionY(dims.top);
        }
        // Set the patch data as an override
        frameImageData.data.set(frame.patch);
  
        // Draw the patch back over the canvas
        if(canvasRef.current && gifCtx){
            canvasRef.current?.getContext('2d').putImageData(frameImageData, 0, 0);
            gifCtx.drawImage(canvasRef.current, positionX, positionY, dims.width * zoom, dims.height * zoom);
        }
        
    };

    const renderFrame = () => {
        if (gifFrames.length === 0) return;
  
        const frame = loadedFrames[frameIndex];
  
        if (frame.disposalType === 2 && gifCtx && canvasRef.current) {
          gifCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
  
        drawPatch(frame);
  
  
        frameIndex = (frameIndex + 1) % loadedFrames.length;
  
        if (playing) {
          // Delay the next gif frame
          setTimeout(() => {
            requestAnimationFrame(renderFrame);
          }, frame.delay);
        }
      };

    const loadGIF = async () => {
          try {
          const response = await fetch(gifUrl);
          const buffer = await response.arrayBuffer();
          const data = new Uint8Array(buffer);
          gifData = parseGIF(data);
          gifFrames = decompressFrames(gifData, true);
          loadedFrames = gifFrames;
          frameIndex = 0;
          renderFrame();
        } catch (error) {
          console.error('Error loading GIF:', error);
        }
    };

    function getMousePosition(event) {
        let rect = gifCanvasRef.current.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        console.log("Coordinate x: " + x, 
                    "Coordinate y: " + y);
        setPositionX(x);
        setPositionY(y);
        setChangedPos(true);
        // reload the gif
        loadGIF();
    }
  
    useEffect(() => {
      gifCtx = gifCanvasRef.current?.getContext('2d');
      console.log(canvasRef.current)
      if (!gifCtx || !canvasRef.current) return;
  
      const playpause = () => {
        playing = !playing;
        if (playing) {
          renderFrame();
        }
      };

      loadGIF();
  
      return () => {
        playing = false;
      };
    }, [gifCanvasRef, canvasRef, gifUrl]);
  
    return (
      <div>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <canvas ref={gifCanvasRef} onClick={(e) => getMousePosition(e)} />
      </div>
    );
  };

export default GifCanvas;