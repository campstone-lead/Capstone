import io from 'socket.io-client'
import store from './store'
import { postMessage } from './store/message'
const socket = io('http://localhost:8080')

socket.on('connect', () => {
  console.log('Connected in the client here!')

  socket.on('send-message', message => {
    console.log('client side message hereee', message)
    //store.dispatch(postMessage(message))

    //  io.emit('send-request', request)

  });
  socket.on('send-response', response => {
    console.log('client side the resoonse hereee', response)
    // store.dispatch(bookArtist(response));
  });
})

export default socket
