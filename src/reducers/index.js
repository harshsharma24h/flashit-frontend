import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterReducer'; // Import your reducers here
import showNotShow  from './singinSingupReducer';
import userLogin from './createadreducer'


const rootReducer = combineReducers({
  counter: counterReducer, // Add your reducers here
  YNvalue:showNotShow,
  userLogin:userLogin
});

export default rootReducer;
