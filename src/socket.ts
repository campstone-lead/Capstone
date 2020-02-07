import io from 'socket.io-client'
import { bookArtist } from './store/artist'
import store from './store'
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('new-request', (request) => {
  console.log('Connected!')
  store.dispatch(bookArtist(request))
})
export default socket;
