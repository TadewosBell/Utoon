import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./DrawingStore";
import MaskReducer from "./MaskEditorStore";
import characterLibrary from "./charactersLibrary";

export default configureStore({
  reducer: {
    image: imageReducer,
    characters: characterLibrary,
    MaskEditor: MaskReducer,
  },
});
