module.exports = io => {


  io.on('connection', socket => {

    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('send-message', message => {
      console.log('got the message on server side  hereee', message)
      socket.broadcast.emit('send-message', message);
    });

    socket.on('send-response', response => {
      console.log('got the resoonse hereee', response)
      socket.broadcast.emit('send-response', response);

    });

  })
}
