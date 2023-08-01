import { createSlice } from "@reduxjs/toolkit";

export const MaskEditorStore = createSlice({
    name: "MaskEditor",
    initialState: {
        tool: "eraser",
        penSize: 5,
        lines: [],
        maskBase64: "",
    },
    reducers: {
        setTool: (state, action) => {
            state.tool = action.payload;
        },
        setPenSize: (state, action) => {
            state.penSize = action.payload;
        },
        setLines: (state, action) => {
            state.lines = action.payload;
        },
        setMaskBase64: (state, action) => {
            state.maskBase64 = action.payload;
        },
    },
});

export const { setTool, setPenSize, setLines, setMaskBase64 } = MaskEditorStore.actions;
export default MaskEditorStore.reducer;