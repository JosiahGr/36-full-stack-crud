import superagent from 'superagent';
import * as routes from '../routes';

// TODO: Linter error here

// SYNC
const setProfile = profile => ({
  type: 'CLIENT_PROFILE_SET',
  payload: 'profile',
});

// ASYNC
const createRequest = profile => (store) => {
  const { token } = store.getState();

  return superagent.post(`${API_URL}${routes.PROFILE_ROUTE}`)
    .set('Authorization', `Bearer ${token}`) // HTTP header, string
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
      // TODO: check the body.value it could be just body or something else
    });
};

const updateRequest = profile => (store) => {
  const { token } = store.getState();

  return superagent.put(`${API_URL}${routes.PROFILE_ROUTE}/${profile._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

const fetchRequest = profile => (store) => {
  const { token } = store.getState();

  return superagent.get(`${API_URL}${routes.PROFILE_ROUTE}/${profile._id}`)
  // TODO: check the route for this. Sluggram was /me not/id
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

export { setProfile, createRequest, updateRequest, fetchRequest }; 
