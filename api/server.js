const express = require('express');
const middleware = require('./middleware/')
const server = express();
const routes = require('./routes/')

server.use(express.json())
middleware(server)
routes(server)

server.get('/', (req, res) => {
  res.send(`<h2>This is the API sprint!</h2>`)
});

server.use((req, res) => {
  return res.status(404).json({ message: "The page you are looking for does not currently exist. Try again!"})
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "An error occurred, please try again later."
  })
})

module.exports = server;