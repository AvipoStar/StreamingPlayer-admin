import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './index'; // Импортируйте свой корневой редюсер

const store = configureStore({
  reducer: rootReducer,
});

export default store;