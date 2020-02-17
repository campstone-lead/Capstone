import io from 'socket.io-client'
import store from './store'
import { postMessage } from './store/message'
const entryURL = (process.env.NODE_ENV === 'production' ? 'https://harmonious-capstone.herokuapp.com/' : 'http://localhost:8080/')
const socket = io(entryURL)

socket.on('connect', () => {
  console.log('Connected in the client here!')

  socket.on('send-message', message => {
    console.log('client side message here', message)
    //store.dispatch(postMessage(message))

    //  io.emit('send-request', request)

  });
  socket.on('send-response', response => {
    console.log('client side the resoonse here', response)
    // store.dispatch(bookArtist(response));
  });
})

export default socket
