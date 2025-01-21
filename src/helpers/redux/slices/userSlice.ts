import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  userId?: number;
  surname?: string;
  name?: string;
  patronymic?: string;
  bornDate?: string;
  email?: string;
  password?: string;
  role_id?: number;
  is_author?: boolean;
  nickname?: string;
  photo_url?: string;
}

export interface IEditUser {
  email?: string;
  password?: string;
  name?: string;
  surname?: string;
  patronymic?: string;
  bornDate?: string;
  photo_url?: string;
}

const initialState: IUser | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (_state, action) => {
      return action.payload;
    },
    updateUser: (_state, action) => {
      return action.payload;
    },
  },
});

// Экспортируем действия и редюсер
export const { setData } = userSlice.actions;
export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
