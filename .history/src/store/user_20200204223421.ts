import axios from 'axios'
import history from '../pages/history'
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
/**
 * INITIAL STATE
 */
const defaultUser = {

}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const auth = (email,password) => async dispatch => {
  try {
    const res = await axios({
      method:"post",
      baseURL:"http://localhost:8080/",
      url:"/auth/login/",
      data:{email, password}
    })

    dispatch(getUser(res.data || defaultUser))
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

}
export const me = () => async dispatch => {
  try {
    const res=await axios({
      method:"get",
      baseURL:"http://localhost:8080/auth/",
      url:"/me/"
    })

    dispatch(getUser(res.data || defaultUser))
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
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
        return {};
    default:
      return state
  }
}
