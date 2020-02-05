import axios from 'axios'
// import history from '../pages/history'
axios.defaults.withCredentials = true;


/**
 * ACTION TYPES
 */
const GET_VENUES = 'GET_VENUES'


/**
 * INITIAL STATE
 */
const defaultState = {
  all: [],
  selected: {}
}

/**
 * ACTION CREATORS
 */
const getVenues = venues => ({ type: GET_VENUES, venues })


/**
 * THUNK CREATORS
 */
export const getRecommendedVenues=(id)=>async dispatch=>{
  try{
    const res=await axios({
      method:"get",
      baseURL:"http://localhost:8080/api/",
      url:`/venues/distance/${id}`
    })
    console.log('got data->>>>',res.data)
    dispatch(getVenues(res.data))
  }catch(err){
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


/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_VENUES:
      return { ...state, all: action.venues }
    default:
      return state
  }
}
