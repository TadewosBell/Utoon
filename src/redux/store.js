import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice";

export default configureStore({
  reducer: {
    image: imageReducer,
  },
});
