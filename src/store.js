import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Assuming you have a root reducer file

const store = configureStore({
  reducer: rootReducer, // Pass your root reducer here
});

export default store;
