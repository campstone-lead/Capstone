import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {

}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})

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
    // window.sessionStorage.setItem('session',JSON.stringify({session:res.data.session,sessionId:res.data.sessionId}))
    dispatch(getUser(res.data || defaultUser))
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
    default:
      return state
  }
}
