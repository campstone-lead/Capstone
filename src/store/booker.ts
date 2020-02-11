import axios from 'axios'
// import history from '../pages/history'
axios.defaults.withCredentials = true;
/**
 * ACTION TYPES
 */
const GET_BOOKER = 'GET_BOOKER'
const UPDATE_BOOKER = 'UPDATE_BOOKER'
const REMOVE_USER = 'REMOVE_USER'
const BOOKER_EVENTS = 'BOOKER_EVENTS'
/**
 *
 * INITIAL STATE
 */
const defaultBooker = {
  bookerEvents: []
}

/**
 * ACTION CREATORS
 */
const getBooker = booker => ({ type: GET_BOOKER, booker })
const bookerEvents = events => ({ type: BOOKER_EVENTS, events })
// export const updateBooker = newBookerData => ({ type: UPDATE_BOOKER, newBookerData })
export const updatedBooker = newBookerData => ({ type: UPDATE_BOOKER, newBookerData })
export const removeUser = () => ({ type: REMOVE_USER })
/**
 * THUNK CREATORS
 */



export const getOneBooker = (id) => async dispatch => {
  try {
    const res = await axios({
      method: "get",
      baseURL: "http://localhost:8080/api/",
      url: `/bookers/${id}`
    })
    dispatch(getBooker(res.data))
  } catch (err) {
    console.log(err)
  }
}
export const getBookerEvents = (id) => async dispatch => {
  try {
    console.log(id)
    const res = await axios({
      method: "get",
      baseURL: "http://localhost:8080/api/",
      url: `/bookers/${id}/events`
    })
    dispatch(bookerEvents(res.data))
  } catch (err) {
    console.log(err)
  }
}
export const updatedVenue = (venue) => async dispatch => {
  try {
    let booker = window.localStorage.getItem('booker')
    booker = JSON.parse(booker || '');
    let newBooker = booker || {};
    if (venue.password === undefined) {
      newBooker['venue'] = { ...newBooker['venue'], ...venue };
      window.localStorage.setItem('booker', JSON.stringify(newBooker))
    }
    else {

      let booker = {
        email: newBooker["email"],
        password: venue.password,
        firstName: newBooker["firstName"],
        lastName: newBooker["lastName"],
        phone: newBooker["phone"]
      }
      const res = await axios({
        method: "post",
        baseURL: "http://localhost:8080/api/",
        url: "/bookers/",
        data: booker
      })

      let v = { ...newBooker["venue"], bookerId: res.data.id }

      await axios({
        method: "post",
        baseURL: "http://localhost:8080/api/",
        url: "/venues/",
        data: v
      })
      window.localStorage.setItem(
        'email',
        JSON.stringify(newBooker["email"])
      )
    }
  } catch (err) {
    console.error(err)
  }
}

//add new venue
//add-venue-form.tsx
export const createdVenue = (v) => async dispatch => {
  try {
    await axios({
      method: "post",
      baseURL: "http://localhost:8080/api/",
      url: `/venues/`,
      data: v
    })
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function (state = defaultBooker, action) {
  switch (action.type) {
    case GET_BOOKER:
      return action.booker
    case UPDATE_BOOKER:
      window.localStorage.setItem('booker', JSON.stringify(action.newBookerData))
      return { ...state, ...action.newBookerData }
    case REMOVE_USER:
      return {};
    case BOOKER_EVENTS:
      return { ...state, bookerEvents: action.events }
    default:
      return state
  }
}
