import { createSlice } from "@reduxjs/toolkit";

export const GameAssets = createSlice({
    name: "GameAssets",
    initialState: {
        running_spritesheet_url:null,  //"https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/ZQMveebZkb_Running_sprite_sheet.png",
        jump_spritesheet_url: null,
        idle_spritesheet_url:null, //"https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/ZQMveebZkb_Idle_sprite_sheet.png",
    },
    reducers: {
        setRunningSpritesheetUrl: (state, action) => {
            state.running_spritesheet_url = action.payload;
        },
        setJumpSpritesheetUrl: (state, action) => {
            state.jump_spritesheet_url = action.payload;
        },
        setIdleSpritesheetUrl: (state, action) => {
            state.idle_spritesheet_url = action.payload;
        },

    },
});

export const { setRunningSpritesheetUrl, setJumpSpritesheetUrl, setIdleSpritesheetUrl } = GameAssets.actions;
// export store for use in other files
export const selectGameAssets = (state) => state.game;

export default GameAssets.reducer;