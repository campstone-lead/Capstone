import io from 'socket.io-client'
import { bookArtist, getArtists, getReq } from './store/artist'
import store from './store'
const socket = io('http://localhost:8080')

socket.on('connect', () => {
  console.log('Connected in the client here!')

  socket.on('send-request', request => {
    console.log('client side the request hereee', request)

    //  io.emit('send-request', request)

  });
  socket.on('send-response', response => {
    console.log('client side the resoonse hereee', response)
    // store.dispatch(bookArtist(response));
  });
})

export default socket
