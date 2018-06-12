import { combineReducers } from 'redux';
import dogs from './dogs';
import token from './token';
import profile from './profile';

export default combineReducers({ 
  dogs, 
  token,
  profile,
});
