module.exports = io => {
  io.on('connection', socket => {
    console.log('I hear you dawg')
    socket.on('disconnect', () => console.log('Connection was lost'))
  })
}
