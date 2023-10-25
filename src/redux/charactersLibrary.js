import { createSlice } from "@reduxjs/toolkit";

export const characterLibrary = createSlice({
  name: "image",
  initialState: {
    userCharacters: [],
    currentCharacterId: null,
  },
  reducers: {
    setCurrentCharacterId: (state, action) => {   
        state.currentCharacterId = action.payload;
    },
    addCharacter: (state, action) => {
      state.userCharacters = [...state.userCharacters, action.payload];
      console.log("Character added to library", state.userCharacters)
    },
    removeCharacter: (state, action) => {
    //   find the index of the character string and remove
        const index = state.userCharacters.indexOf(action.payload);
        if (index > -1) {
            state.userCharacters.splice(index, 1);
        }
    },
    saveToLocalStorage: (state) => {
        localStorage.setItem('reduxState', JSON.stringify(state))
    },
    loadFromLocalStorage: (state) => {
        const reduxState = localStorage.getItem('reduxState')
        if (reduxState) {
            state = JSON.parse(reduxState)
        }
    },
    deleteFromLocalStorage: (state) => {
        localStorage.removeItem('reduxState')
    }
  },
});

export const { setCurrentCharacterId, addCharacter, removeCharacter, saveToLocalStorage, loadFromLocalStorage, deleteFromLocalStorage } = characterLibrary.actions;
export default characterLibrary.reducer;
