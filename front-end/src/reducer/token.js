import { fetchCookie } from '../utils/cookie';

const token = fetchCookie('X-Sluggram-Token');
/* 
TODO: This needs to be my backend, not sluggrams
check video for sluggram code that i need to add to the dog app

res.cookie('X-Sluggram-Token', token, {maxAge: 900000})
    res.send(token)
*/

const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOKEN_SET':
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
