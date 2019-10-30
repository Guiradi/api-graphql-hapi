const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = require('graphql')

const UserType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
        favoriteWebsites: { type: GraphQLString }
    })
})

module.exports = UserType