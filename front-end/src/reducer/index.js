import { combineReducers } from 'redux';
import dogs from './dogs';
import token from './token';
import clientProfile from './client-profile';

export default combineReducers({ 
  dogs, 
  token,
  clientProfile,
});
