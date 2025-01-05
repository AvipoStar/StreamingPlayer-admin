import { combineReducers } from "redux";
import userSlice from "./slices/userSlice";
import genresSlice from './slices/genresSlice';

const rootReducer = combineReducers({
  user: userSlice,
  genres: genresSlice
});

export default rootReducer;
