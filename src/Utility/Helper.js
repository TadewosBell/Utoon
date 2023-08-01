export const calculateRatio = (
    canvasWidth,
    canvasHeight,
    oW,
    oH 
  ) => {
    if (Math.min(canvasHeight, canvasHeight) > Math.max(oW, oH)) {
      return 1;
    } else if (oH >= oW && canvasHeight >= canvasWidth) {
      return canvasHeight / oH;
    } else if (oH < oW && canvasHeight >= canvasWidth) {
      return canvasHeight / oW;
    } else if (oH >= oW && canvasHeight < canvasWidth) {
      return canvasWidth / oH;
    } else {
      return canvasWidth / oW;
    }
};

export const resizedataURL = (
    datas,
    wantedWidth,
    wantedHeight
  ) => {
    return new Promise(async function (resolve, reject) {
      // We create an image to receive the Data URI
      var img = document.createElement("img");
      // When the event "onload" is triggered we can resize the image.
      img.onload = function () {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = wantedWidth;
        canvas.height = wantedHeight;
        ctx?.drawImage(img, 0, 0, wantedWidth, wantedHeight);
        var dataURI = canvas.toDataURL();
        resolve(dataURI);
      };
      img.src = datas;
    });
  };

export const isTouch = (e) => {
    if (window.TouchEvent && e.nativeEvent) {
      return e.nativeEvent instanceof TouchEvent;
    }
    return false;
};



