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
  address:"",
  photo:"",
  description:""
}
}

/**
 * ACTION CREATORS
 */
const getBooker = booker => ({type: GET_BOOKER, booker})
//export const updatedBooker = newBookerData => ({type: UPDATE_BOOKER, newBookerData})
export const updateBooker = newBookerData => ({type: UPDATE_BOOKER, newBookerData})
export const updatedBooker = newBookerData => ({type: UPDATE_BOOKER, newBookerData})
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
export const updatedVenue = (venue) => async dispatch => {
  try {
    let booker=window.localStorage.getItem('booker')
    booker=JSON.parse(booker||'');
    let newBooker=booker||{};
    newBooker['venue']={...newBooker['venue'],...venue};
    window.localStorage.setItem('booker',JSON.stringify(newBooker))
    if(newBooker["venue"].capacity!==undefined){
      let booker={
      email: newBooker["email"],
      password:newBooker["password"],
      firstName:newBooker["firstName"],
      lastName:newBooker["lastName"],
      phone:newBooker["phone"],
      genres:['pop'],
      }
      console.log(booker)
      const res=await axios({
        method:"post",
        baseURL:"http://localhost:8080/api/",
        url:"/bookers/",
        data:booker
      })
console.log(newBooker["venue"].photo.slice(4))
      let venue={
        description:newBooker["venue"].description,
        name:newBooker["venue"].address,
        address:newBooker["venue"].address,
        latitude:newBooker["venue"].latitude,
        longitude:newBooker["venue"].longitude,
        capacity:100,
        bookerId:res.data.id||1,

      }
      await  axios({
        method:"post",
        baseURL:"http://localhost:8080/api/",
        url:"/venues/",
        data:venue
      })
    }
    dispatch(updateVenue(newBooker))
  } catch (err) {
    console.error(err)
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
      window.localStorage.setItem('booker',JSON.stringify(action.newBookerData))
      return {...state,...action.newBookerData}
    case UPDATE_VENUE:
    return action.venue;
    default:
      return state
  }
}
