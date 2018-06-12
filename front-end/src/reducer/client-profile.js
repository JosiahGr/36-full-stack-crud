const D23_001 = 'Profile is required';
const D23_002 = 'Invalid Profile';

const validateProfile = (profile) => {
  if (!profile) {
    throw new Error(D23_001);
  }
  const { 
    username, email, bio, owner,
  } = profile; // TODO: update based on puppy pound info

  if (!username || !email || !bio || !owner) {
    throw new Error(D23_002);
  }
  return undefined;
};

export default (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CLIENT_PROFILE_SET':
      validateProfile(payload);
      return payload;
    case 'TOKEN_REMOVE': // when we remove a token we want to log out the user
      return null; // this removes the profile from the store
    default: 
      return state;
  }
};
