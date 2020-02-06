import axios from 'axios'
// import history from '../pages/history'
axios.defaults.withCredentials = true;
/**
 * ACTION TYPES
 */
const GET_BOOKER = 'GET_BOOKER'
const UPDATE_BOOKER = 'UPDATE_BOOKER'
const UPDATE_VENUE = 'UPDATE_VENUE'
const REMOVE_USER = 'REMOVE_USER'
const CREATE_VENUE = 'CREATE_VENUE'
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
//export const updatedBooker = newBookerData => ({type: UPDATE_BOOKER, newBookerData})
export const updateBooker = newBookerData => ({ type: UPDATE_BOOKER, newBookerData })
export const updatedBooker = newBookerData => ({ type: UPDATE_BOOKER, newBookerData })
export const updateVenue = venue => ({ type: UPDATE_VENUE, venue })
export const createVenue = venue => ({ type: CREATE_VENUE, venue })
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
    let password = venue.password;
    booker = JSON.parse(booker || '');
    let newBooker = booker || {};

    if (password === undefined) {
      newBooker['venue'] = { ...newBooker['venue'], ...venue };
      window.localStorage.setItem('booker', JSON.stringify(newBooker))
    }
    if (password !== undefined) {

      let booker = {
        email: newBooker["email"],
        password: password,
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

      let URL = newBooker["venue"].photo.slice(5)
      let v = {
        description: newBooker["venue"].description,
        name: newBooker["venue"].address,
        address: newBooker["venue"].address,
        latitude: newBooker["venue"].latitude,
        longitude: newBooker["venue"].longitude,
        capacity: newBooker["venue"].capacity,
        genres: newBooker["venue"].genres,
        bookerId: res.data.id || 1,
        imageURL: URL
      }
      await axios({
        method: "post",
        baseURL: "http://localhost:8080/api/",
        url: "/venues/",
        data: v
      })
    }
    dispatch(updateVenue(newBooker))
  } catch (err) {
    console.error(err)
  }
}

//add new venue
//add-venue-form.tsx
export const createdVenue = (bookerId, sentVenue) => async dispatch => {
  try {

    let venueAxios = {
      description: sentVenue["description"],
      name: sentVenue["address"],
      address: sentVenue["address"],
      latitude: sentVenue["latitude"],
      longitude: sentVenue["longitude"],
      capacity: sentVenue["capacity"],
      bookerId: bookerId || 1,
      imageURL: URL
    }
    await axios({
      method: "post",
      baseURL: "http://localhost:8080/api/",
      url: `/venues/`,
      data: venueAxios
    })
    dispatch(createVenue(sentVenue))
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
    case UPDATE_VENUE:
      return action.venue;
    case CREATE_VENUE:
      return action.venue
    case REMOVE_USER:
      return {};
    case BOOKER_EVENTS:
      return { ...state, bookerEvents: action.events }
    default:
      return state
  }
}
