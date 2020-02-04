import axios from 'axios'
import history from '../pages/history'
/**
 * ACTION TYPES
 */
const GET_BOOKER = 'GET_BOOKER'
const UPDATE_BOOKER = 'UPDATE_BOOKER'
const UPDATE_VENUE = 'UPDATE_VENUE'
const REMOVE_USER = 'REMOVE_USER'
/**
 *
 * INITIAL STATE
 */
const defaultBooker = {
// email: '',
// password:'',
// firstName:'',
// lastName:'',
// phone:'',
// venue:{
//   location:{},
//   address:"",
//   photo:"",
//   description:""
// }
}

/**
 * ACTION CREATORS
 */
const getBooker = booker => ({type: GET_BOOKER, booker})
//export const updatedBooker = newBookerData => ({type: UPDATE_BOOKER, newBookerData})
export const updateBooker = newBookerData => ({type: UPDATE_BOOKER, newBookerData})
export const updatedBooker = newBookerData => ({type: UPDATE_BOOKER, newBookerData})
export const updateVenue = venue => ({type: UPDATE_VENUE, venue})
export const removeUser = () => ({type: REMOVE_USER})
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    // const res = await axios.get('/auth/me')

    const res=await axios({
      method:"get",
      baseURL:"http://localhost:8080/auth/",
      url:"/me/"
    })

    dispatch(getBooker(res.data || defaultBooker))

  } catch (err) {
    console.error(err)
  }

}

export const auth = (email,password) => async dispatch => {
  try {
    console.log('here1')
    const res = await axios({
      method:"post",
      baseURL:"http://localhost:8080/",
      url:"/auth/login/",
      data:{email, password},
      withCredentials:true
    })
    console.log('here2',res.data)
    // window.sessionStorage.setItem('session',JSON.stringify({session:res.data.session,sessionId:res.data.sessionId}))
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
     let URL= newBooker["venue"].photo.slice(5)
      let venue={
        description:newBooker["venue"].description,
        name:newBooker["venue"].address,
        address:newBooker["venue"].address,
        latitude:newBooker["venue"].latitude,
        longitude:newBooker["venue"].longitude,
        capacity:newBooker["venue"].capacity,
        bookerId:res.data.id||1,
        imageURL:URL
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
export const logout = () => async dispatch => {
  try {
    await axios({
      method:"post",
      baseURL:"http://localhost:8080/",
      url:"/auth/logout/"
    })
    window.sessionStorage.clear();
    dispatch(removeUser())
    history.push('/login')
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
      console.log(state,action.booker)
      return action.booker
    case UPDATE_BOOKER:
      window.localStorage.setItem('booker',JSON.stringify(action.newBookerData))
      return {...state,...action.newBookerData}
    case UPDATE_VENUE:
    return action.venue;
    case REMOVE_USER:
      return {};
    default:
      return state
  }
}