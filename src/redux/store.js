import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice";
import characterLibrary from "./charactersLibrary";

export default configureStore({
  reducer: {
    image: imageReducer,
    characters: characterLibrary,
  },
});
