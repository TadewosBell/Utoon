import { createSlice } from "@reduxjs/toolkit";

export const DrawingStore = createSlice({
  name: "image",
  initialState: {
    drawingID: "",
    drawing_url: "",
    backgroundUrl: null,
    current_animation_url: null,
    selected_animation: null,
    with_background_url: null,
    coordinates: null,
    boundingBox: { x: 200, width: 100, y: 200, height: 100, id: "1" },
    imageDimenstions: { width: 10, height: 10 },
    mask_url: null,
    cropped_image_url: null,
    cropped_image_dimensions: { width: 10, height: 10 },
    skeleton: null,
  },
  reducers: {
    setCurrentDrawingID: (state, action) => {   
      state.drawingID = action.payload;
    },
    setDrawingUrl: (state, action) => {
      state.drawing_url = action.payload;
    },
    setCurrentAnimationUrl: (state, action) => {
      state.current_animation_url = action.payload;
    },
    setSelectedAnimation: (state, action) => {
      state.selected_animation = action.payload;
    },
    setWithBackgroundUrl: (state, action) => {
      state.with_background_url = action.payload;
    },
    displaybackground: (state, action) => {
      state.backgroundUrl = action.payload;
    },
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
    setBoundingBox: (state, action) => {
      state.boundingBox = action.payload;
    },
    setImageDimenstions: (state, action) => {
      state.imageDimenstions = action.payload;
    },
    setMaskUrl: (state, action) => {
      state.mask_url = action.payload;
    },
    setCroppedImageUrl: (state, action) => {
      state.cropped_image_url = action.payload;
    },
    setCroppedImageDimensions: (state, action) => {
      state.cropped_image_dimensions = action.payload;
    },
    setSkeleton: (state, action) => {
      state.skeleton = action.payload;
    },
    resetState: (state, action) => {
      state = {
        drawingID: null,
        drawing_url: "",
        backgroundUrl: null,
        current_animation_url: null,
        with_background_url: null,
        coordinates: null,
        boundingBox: { x: 200, width: 100, y: 200, height: 100, id: "1" },
        imageDimenstions: { width: 10, height: 10 },
        mask_url: null,
        cropped_image_url: null,
        cropped_image_dimensions: { width: 10, height: 10 },
        skeleton: null,
      };
    }
  },
});

export const { 
  setCurrentDrawingID, 
  setDrawingUrl, 
  displaybackground, 
  setWithBackgroundUrl,
  setBoundingBox, 
  setCoordinates, 
  setImageDimenstions,
  setMaskUrl,
  setCroppedImageUrl,
  setCroppedImageDimensions,
  setSkeleton,
  setCurrentAnimationUrl,
  setSelectedAnimation,
  resetState
} = DrawingStore.actions;
export default DrawingStore.reducer;
