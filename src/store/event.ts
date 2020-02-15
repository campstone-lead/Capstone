import axios from 'axios'
// import history from '../pages/history'
axios.defaults.withCredentials = true;

const entryURL = (process.env.NODE_ENV === 'production' ? 'https://harmonious-capstone.herokuapp.com/' : 'http://localhost:8080/')


/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS'
const GET_ONE_EVENT = 'GET_ONE_EVENT'
const CREATE_EVENT = 'CREATE_EVENT'


/**
 * INITIAL STATE
 */
const defaultState = {
  allEvents: [],
  currentEvent: {}
}

/**
 * ACTION CREATORS
 */
const getEvents = events => ({ type: GET_EVENTS, events })
const oneEvent = event => ({ type: GET_ONE_EVENT, event })
const createEvent = event => ({ type: CREATE_EVENT, event })


/**
 * THUNK CREATORS
 */
export const gotOneEvents = (id) => async dispatch => {
  try {
    const res = await axios({
      method: "get",
      baseURL: entryURL,
      url: `/api/events/${id}`
    })

    dispatch(oneEvent(res.data || defaultState.currentEvent))
  } catch (err) {
    console.log(err)
  }
}
export const fetchEvents = () => async dispatch => {
  try {
    const res = await axios({
      method: "get",
      baseURL: entryURL,
      url: "/api/events/"
    })

    dispatch(getEvents(res.data || defaultState.allEvents))
  } catch (err) {
    console.error(err)
  }
}

export const createdEvent = (sentEvent) => async dispatch => {
  try {
    // NOTE: sentEvent is of the form:
    // sentEvent = {
    //   event: {},
    //   venueId: 0
    // }
    await axios({
      method: "post",
      baseURL: entryURL,
      url: `/api/events/`,
      data: sentEvent
    })
    dispatch(createEvent(sentEvent.event))
  } catch (err) {
    console.error(err)
  }
}


/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, allEvents: action.events }
    case GET_ONE_EVENT:
      return { ...state, currentEvent: action.event }
    case CREATE_EVENT:
      return { ...state }
    default:
      return state
  }
}
