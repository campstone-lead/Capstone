import axios from 'axios';
import history from '../pages/history';

axios.defaults.withCredentials = true;
const entryURL = (process.env.NODE_ENV === 'production' ? 'https://harmonious-capstone.herokuapp.com/' : 'http://localhost:8080/')


/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const SIGN_UP_WITH_GOOGLE = 'SIGN_UP_WITH_GOOGLE';
/**
 * INITIAL STATE
 */
const defaultUser = {
  ifGoogle: false,
  isActive: false,
  user: {},
};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const signedUpWithGoogle = user => ({
  type: SIGN_UP_WITH_GOOGLE,
  user,
});

/**
 * THUNK CREATORS
 */
export const auth = (email, password) => async dispatch => {
  try {
    const res = await axios({
      method: 'post',
      baseURL: entryURL,
      url: '/auth/login/',
      data: { email, password },
    });
    window.localStorage.setItem('loginSuccess', JSON.stringify(true));
    dispatch(getUser(res.data || defaultUser));
  } catch (authError) {
    window.localStorage.setItem('error', JSON.stringify(authError));
    return dispatch(getUser({ error: authError }));
  }
};
export const authWithGoogle = googleId => async dispatch => {
  try {
    const res = await axios({
      method: 'post',
      baseURL: entryURL,
      url: '/auth/login/',
      data: { googleId },
    });
    window.localStorage.setItem('loginSuccess', JSON.stringify(true));
    dispatch(getUser(res.data || defaultUser));
  } catch (authError) {
    window.localStorage.setItem('error', JSON.stringify(authError));
    return dispatch(getUser({ error: authError }));
  }
};

export const signUpWithGoogle = googleResponse => async dispatch => {
  try {
    let newUser = googleResponse.profileObj;
    try {
      const res = await axios({
        method: 'post',
        baseURL: entryURL,
        url: '/auth/login/',
        data: { email: newUser.email, googleId: newUser.googleId },
      });
      window.localStorage.setItem('loginSuccess', JSON.stringify(true));
      dispatch(getUser(res.data || defaultUser));
    } catch (error) {
      dispatch(signedUpWithGoogle(newUser));
    }
  } catch (error) {
    console.error(error);
  }
};
export const me = () => async dispatch => {
  try {
    const res = await axios({
      method: 'get',
      baseURL: entryURL,
      url: '/auth/me/',
    });

    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};
export const logout = () => async dispatch => {
  try {
    await axios({
      method: 'post',
      baseURL: entryURL,
      url: '/auth/logout/',
    });
    window.localStorage.clear();
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};
/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...action.user, isActive: true };
    case REMOVE_USER:
      return {};
    case SIGN_UP_WITH_GOOGLE:
      let newUser = {
        firstName: action.user.givenName,
        lastName: action.user.familyName,
        email: action.user.email,
        googleId: action.user.googleId,
        imageURL: action.user.imageUrl,
      };
      window.localStorage.setItem('google', JSON.stringify(newUser));
      return { ...state, ifGoogle: true };
    default:
      return state;
  }
}
