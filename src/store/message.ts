import axios from 'axios'
import socket from '../socket';
axios.defaults.withCredentials = true;

/**
 * ACTION TYPES
 */
export const GET_MESSAGES = 'GET_MESSAGES'
export const POST_MESSAGES = 'POST_MESSAGES'


/**
 * INITIAL STATE
 */
const defaultState = []

/**
 * ACTION CREATORS
 */
export const getMessages = messages => ({ type: GET_MESSAGES, messages })
export const postMessage = message => ({ type: POST_MESSAGES, message })


/**
 * THUNK CREATORS
 */

export const fetchMessages = () => async dispatch => {
  try {
    const res = await axios({
      method: "get",
      baseURL: "http://localhost:8080/api/",
      url: "/messages/"
    })

    dispatch(getMessages(res.data || defaultState))
  } catch (err) {
    console.error(err)
  }
}

export const createMessage = (message) => async dispatch => {
  try {
    const res = await axios({
      method: "post",
      baseURL: "http://localhost:8080/api/",
      url: `/messages/`,
      data: message
    })
    dispatch(postMessage(res.data))
    socket.emit('send-message', res.data)
  } catch (err) {
    console.error(err)
  }
}


/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages
    case POST_MESSAGES:
      return [...state, action.message]
    default:
      return state
  }
}
