require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
  })

const hapi = require('hapi')
const mongoose = require('mongoose')
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi')

const schema = require('./graphql/schema')

const User = require('./Models/User')

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('Conectado ao MongoDB')
})

const start = async () => {
    const server = new hapi.Server({
        port: process.env.API_PORT,
        host: process.env.API_HOST
    })

    await server.register({
        plugin: graphiqlHapi,
        options: {
            path: '/graphql',
            graphiqlOptions: {
                endpointURL: '/graphql'
            },
            route: {
                cors: true
            }
        }
    })

    await server.register({
        plugin: graphqlHapi,
        options: {
            path: '/graphql',
            graphiqlOptions: {
                schema
            },
            route: {
                cors: true
            }
        }
    })

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: (req, res) => {
                return 'Hello World'
            }
        },
        {
            method: 'GET',
            path: '/v1/users',
            handler: (req, res) => {
                return User.find()
            }
        },
        {
            method: 'POST',
            path: '/v1/users',
            handler: (req, res) => {
                const { name, email, age, favoriteWebsites } = req.payload
                const user = new User({
                    name,
                    email,
                    age,
                    favoriteWebsites 
                })
                return user.save()
            }
        }
    ])

    try {
        await server.start()
    } catch (error) {
        console.log(`Erro ao iniciar o servidor: ${error.message}`);
    }

    console.log(`Api executando em: ${api.info.uri}`)
}

start()