import { createSlice } from "@reduxjs/toolkit";

const currentTrackSlice = createSlice({
  name: "currentTrack",
  initialState: null,
  reducers: {
    setCurrentTrack: (_state, action) => {
      return action.payload;
    },
  },
});

// Экспортируем действия и редюсер
export const { setCurrentTrack } = currentTrackSlice.actions;
export default currentTrackSlice.reducer;
