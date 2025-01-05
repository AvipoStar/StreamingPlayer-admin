import { createSlice } from "@reduxjs/toolkit";

export interface IGenre {
  id: number;
  name: string;
}

const initialState: IGenre[] = [];

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setGenres: (state, action) => {
      return action.payload;
    },
  },
});

// Экспортируем действия и редюсер
export const { setGenres } = genresSlice.actions;
export default genresSlice.reducer;
