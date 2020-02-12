import axios from 'axios';
import history from '../pages/history';
import { logoWindows } from 'ionicons/icons';
// axios.defaults.withCredentials = true;
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const SIGN_UP_WITH_GOOGLE = 'SIGN_UP_WITH_GOOGLE';
/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
export const signUpWithGoogle = response => ({
  type: SIGN_UP_WITH_GOOGLE,
  response,
});

/**
 * THUNK CREATORS
 */
export const auth = (email, password) => async dispatch => {
  try {
    const res = await axios({
      method: 'post',
      baseURL: 'http://localhost:8080/',
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
export const me = () => async dispatch => {
  try {
    const res = await axios({
      method: 'get',
      baseURL: 'http://localhost:8080/auth/',
      url: '/me/',
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
      baseURL: 'http://localhost:8080/',
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
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    case SIGN_UP_WITH_GOOGLE:
      console.log(action.response.profileObj);
      let newUser = action.response.profileObj;
      newUser = {
        firstName: newUser.givenName,
        lastName: newUser.familyName,
        email: newUser.email,
        googleId: newUser.googleId,
        imageURL: newUser.imageUrl,
      };
      window.localStorage.setItem('google', JSON.stringify(newUser));
      return state;
    default:
      return state;
  }
}
