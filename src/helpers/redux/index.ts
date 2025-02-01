import { combineReducers } from "redux";
import userSlice from "./slices/userSlice";
import genresSlice from './slices/genresSlice';
import currentTrackSlice from './slices/CurrentTrack';

const rootReducer = combineReducers({
  user: userSlice,
  genres: genresSlice,
  currentTrack: currentTrackSlice,
});

export default rootReducer;
