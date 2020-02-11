module.exports = io => {


  io.on('connection', socket => {

    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('send-request', request => {
      console.log('got the request hereee', request)
      socket.emit('send-request', request);
    });

    socket.on('send-response', response => {
      console.log('got the resoonse hereee', response)
      socket.emit('send-response', response);

    });

  })
}
