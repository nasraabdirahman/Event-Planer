require('dotenv').config()
const express = require('express')
// dont forget to add the route
const EventAppRouters = require("./routes/Events")
// creates express app
const app = express()
// routes
app.use(EventAppRouters)
// listen to port number for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port 4000')
})

process.env
