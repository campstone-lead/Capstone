import io from 'socket.io-client'
const entryURL = (process.env.NODE_ENV === 'production' ? 'https://harmonious-capstone.herokuapp.com/' : 'http://localhost:8080/')
const socket = io(entryURL)

socket.on('connect', () => {
  console.log('Connected in the client !')

  socket.on('send-message', message => {



  });
  socket.on('send-response', response => {

  });
})

export default socket
