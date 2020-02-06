import axios from 'axios'
// import history from '../pages/history'
axios.defaults.withCredentials = true;


/**
 * ACTION TYPES
 */
const GET_VENUES = 'GET_VENUES'
const GET_SINGLE_VENUE = 'GET_SINGLE_VENUE'


/**
 * INITIAL STATE
 */
const defaultState = {
  all: [],
  single: {},
  selected: {}
}

/**
 * ACTION CREATORS
 */
const getVenues = venues => ({ type: GET_VENUES, venues })
const getSingleVenue = venue => ({ type: GET_SINGLE_VENUE, venue })


/**
 * THUNK CREATORS
 */
export const getRecommendedVenues = (id) => async dispatch => {
  try {
    const res = await axios({
      method: "get",
      baseURL: "http://localhost:8080/api/",
      url: `/venues/distance/${id}`
    })
    console.log('got data->>>>', res.data)
    dispatch(getVenues(res.data))
  } catch (err) {
    console.log(err)
  }
}
export const fetchVenues = () => async dispatch => {
  try {
    const res = await axios({
      method: "get",
      baseURL: "http://localhost:8080/api/",
      url: "/venues/distance/"
    })
    window.localStorage.setItem('venueList', JSON.stringify(res.data))
    dispatch(getVenues(res.data || defaultState))
  } catch (err) {
    console.error(err)
  }
}

export const fetchOneVenue = (id) => async dispatch => {
  try {
    const res = await axios({
      method: "get",
      baseURL: "http://localhost:8080/api/",
      url: `/venues/${id}`
    })

    dispatch(getSingleVenue(res.data || defaultState))
  } catch (error) {
    console.error(error)
  }
}



/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_VENUES:
      return { ...state, all: action.venues }
    case GET_SINGLE_VENUE:
      return { ...state, single: action.venue }
    default:
      return state
  }
}
