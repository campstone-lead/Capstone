import axios from 'axios';
// import history from '../pages/history'
import { auth } from './user';

const entryURL = (process.env.NODE_ENV === 'production' ? 'https://harmonious-capstone.herokuapp.com/' : 'http://localhost:8080/')

axios.defaults.withCredentials = true;
/**
 * ACTION TYPES
 */
const GET_BOOKER = 'GET_BOOKER';
const UPDATE_BOOKER = 'UPDATE_BOOKER';
const REMOVE_USER = 'REMOVE_USER';
const BOOKER_EVENTS = 'BOOKER_EVENTS';
/**
 *
 * INITIAL STATE
 */
const defaultBooker = {
  bookerEvents: [],
  booker: {},
  venues: []
};

/**
 * ACTION CREATORS
 */
const getBooker = booker => ({ type: GET_BOOKER, booker });
const bookerEvents = events => ({ type: BOOKER_EVENTS, events });
// export const updateBooker = newBookerData => ({ type: UPDATE_BOOKER, newBookerData })
export const updatedBooker = newBookerData => ({
  type: UPDATE_BOOKER,
  newBookerData,
});
export const removeUser = () => ({ type: REMOVE_USER });
/**
 * THUNK CREATORS
 */

export const getOneBooker = id => async dispatch => {
  try {
    const res = await axios({
      method: 'get',
      baseURL: entryURL,
      url: `/api/bookers/${id}`,
    });
    dispatch(getBooker(res.data));
  } catch (err) {
    console.log(err);
  }
};
export const getBookerEvents = id => async dispatch => {
  try {
    const res = await axios({
      method: 'get',
      baseURL: entryURL,
      url: `/api/bookers/${id}/events`,
    });
    dispatch(bookerEvents(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const editBooker = (editedBooker) => async dispatch => {
  try {
    const res = await axios({
      method: 'put',
      baseURL: entryURL,
      url: `/api/bookers`,
      data: editedBooker
    });
    dispatch(updatedBooker(res.data))
  } catch (err) {
    console.log(err)
  }
}




//thunk for signup as a booker
export const signUpBooker = bookerInfo => async dispatch => {
  try {
    let booker = window.localStorage.getItem('booker');
    if (booker === null || !bookerInfo.password)
      window.localStorage.setItem('booker', JSON.stringify(bookerInfo));
    else {
      booker = JSON.parse(booker || '');
      let newBooker = booker || {};
      let sendBooker = {
        email: newBooker['email'],
        password: bookerInfo.password,
        firstName: newBooker['firstName'],
        lastName: newBooker['lastName'],
        phone: newBooker['phone'],
      };
      const res = await axios({
        method: 'post',
        baseURL: entryURL,
        url: '/api/bookers/',
        data: sendBooker,
      });

      let venue = window.localStorage.getItem('venue');
      venue = JSON.parse(venue || '');
      let newVenue = venue || {};
      newVenue = { ...newVenue, bookerId: res.data.id, imageURL: newVenue['photo'] };

      await axios({
        method: 'post',
        baseURL: entryURL,
        url: '/api/venues/',
        data: newVenue,
      });
      window.localStorage.removeItem('booker');
      window.localStorage.removeItem('venue');
      dispatch(auth(sendBooker.email, sendBooker.password));
      // dispatch(signUpBooker())}
    }
  } catch (error) {
    console.error(error);
  }
};

//venue creator for signup
export const signUpVenue = venueParam => async dispatch => {
  let venue = window.localStorage.getItem('venue');
  if (venue === null) {
    window.localStorage.setItem('venue', JSON.stringify(venueParam));
  } else {
    venue = JSON.parse(venue || '');
    let newVenue = venue || {};
    newVenue = { ...newVenue, ...venueParam };
    window.localStorage.setItem('venue', JSON.stringify(newVenue));
  }
};


//add new venue
//add-venue-form.tsx
export const createdVenue = v => async dispatch => {
  try {
    await axios({
      method: 'post',
      baseURL: entryURL,
      url: `/api/venues/`,
      data: v,
    });
  } catch (err) {
    console.error(err);
  }
};
/**
 * REDUCER
 */
export default function (state = defaultBooker, action) {
  switch (action.type) {
    case GET_BOOKER:
      return { ...state, booker: action.booker.user, venues: action.booker.venues };
    case UPDATE_BOOKER:
      window.localStorage.setItem(
        'booker',
        JSON.stringify(action.newBookerData)
      );
      return { ...state, ...action.newBookerData };
    case REMOVE_USER:
      return {};
    case BOOKER_EVENTS:
      return { ...state, bookerEvents: action.events };
    default:
      return state;
  }
}
