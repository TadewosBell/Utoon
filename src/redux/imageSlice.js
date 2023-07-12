import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
  name: "image",
  initialState: {
    imageUrl: null,
    backgroundUrl: null,
  },
  reducers: {
    displayinCard: (state, action) => {
      state.imageUrl = action.payload;
    },
    displaybackground: (state, action) => {
      state.backgroundUrl = action.payload;
    },
  },
});

export const { displayinCard, displaybackground } = imageSlice.actions;
export default imageSlice.reducer;
