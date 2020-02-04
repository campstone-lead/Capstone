import axios from 'axios'
import history from '../pages/history'
/**
 * ACTION TYPES
 */
const GET_BOOKER = 'GET_BOOKER'
const UPDATE_BOOKER = 'UPDATE_BOOKER'
const UPDATE_VENUE = 'UPDATE_VENUE'
/**
 * INITIAL STATE
 */
const defaultBooker = {
email: '',
password:'',
firstName:'',
lastName:'',
phone:'',
venue:{
  location:{},
  address:""
}
}

/**
 * ACTION CREATORS
 */
const getBooker = booker => ({type: GET_BOOKER, booker})
//export const updatedBooker = newBookerData => ({type: UPDATE_BOOKER, newBookerData})
export const updateBooker = newBookerData => ({type: UPDATE_BOOKER, newBookerData})
export const updateVenue = venue => ({type: UPDATE_VENUE, venue})

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
    window.localStorage.setItem('booker',JSON.stringify(data))
    dispatch(updateBooker(data));
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
      return {...state,
        firstName: action.newBookerData.firstName,
        lastName: action.newBookerData.lastName,
        phone: action.newBookerData.phone,
        email: action.newBookerData.email
      }
    case UPDATE_VENUE:
    let booker=window.localStorage.getItem('booker')
    booker=JSON.parse(booker||'');
    if(booker!==null)
  {let newBooker=booker;
    newBooker['venue']=action.venue;
    window.localStorage.setItem('booker',JSON.stringify(newBooker))
  }
      // return {...state,venue:{
      //   location:action.venue.location,
      //   address: action.venue.address
      // }}
      return state;
    default:
      return state
  }
}
