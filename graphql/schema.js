const { GraphQLObjectType, GraphQLID, GraphQLSchema } = require('graphql')
const Usertype = require('./UserType')
const User = require('../Models/User')

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: Usertype,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})