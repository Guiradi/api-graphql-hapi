require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
  })

const hapi = require('hapi')

const api = hapi.Server({
    port: process.env.API_PORT,
    host: process.env.API_HOST
})