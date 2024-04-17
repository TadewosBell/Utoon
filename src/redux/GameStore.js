import { createSlice } from "@reduxjs/toolkit";

export const GameAssets = createSlice({
    name: "GameAssets",
    initialState: {
        "running_spritesheet_url": null,
        "idle_spritesheet_url": null, 
        "jump_spritesheet_url": null, 
        "pain_spritesheet_url": null,
        // "idle_spritesheet_url": "https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/gstrMloHND_Idle_sprite_sheet.png",
        // "jump_spritesheet_url": "https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/gstrMloHND_Game_Jump_sprite_sheet.png",
        // "running_spritesheet_url": "https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/gstrMloHND_Running_sprite_sheet.png",
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
        setPainSpritesheetUrl: (state, action) => {
            state.pain_spritesheet_url = action.payload;
        },
        generateAllSpritesheetUrls: (state, action) => {
            const drawingID = action.payload;
            const running_spritesheet_url = `https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/${drawingID}_Running_sprite_sheet.png`;
            const idle_spritesheet_url = `https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/${drawingID}_Idle_sprite_sheet.png`;
            const jump_spritesheet_url = `https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/${drawingID}_Game_Jump_sprite_sheet.png`;
            const pain_spritesheet_url = `https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/${drawingID}_Pain_sprite_sheet.png`;
            state.running_spritesheet_url = running_spritesheet_url;
            state.idle_spritesheet_url = idle_spritesheet_url;
            state.jump_spritesheet_url = jump_spritesheet_url;
            state.pain_spritesheet_url = pain_spritesheet_url;
        }

    },
});

export const { setRunningSpritesheetUrl, setJumpSpritesheetUrl, setIdleSpritesheetUrl, setPainSpritesheetUrl, generateAllSpritesheetUrls } = GameAssets.actions;
// export store for use in other files
export const selectGameAssets = (state) => state.game;

export default GameAssets.reducer;