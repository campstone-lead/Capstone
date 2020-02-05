import axios from 'axios'
import history from '../pages/history'
/**
 * ACTION TYPES
 */
const GET_BOOKER = 'GET_BOOKER'
const UPDATE_BOOKER = 'UPDATE_BOOKER'

/**
 * INITIAL STATE
 */
const defaultBooker = {}

/**
 * ACTION CREATORS
 */
const getBooker = booker => ({type: GET_BOOKER, booker})
export const updateBooker = newBookerData => ({type: UPDATE_BOOKER, newBookerData})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getBooker(res.data || defaultBooker))
  } catch (err) {
    console.error(err)
  }
}

export const  updatedBooker=(data)=>async dispatch=>{
  try{

    dispatch(updateBooker(data));
   // history.push('/signup/booker/2');
   history.push('/home')
  }catch(err){
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultBooker, action) {
  switch (action.type) {
    case GET_BOOKER:
      return action.booker
    case UPDATE_BOOKER:
      return {...state, ...action.newBookerData}
    default:
      return state
  }
}
