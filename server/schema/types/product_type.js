const mongoose = require("mongoose");
const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt
} = graphql;

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    weight: { type: GraphQLInt },
    category: {
      type: require("./category_type"),
      resolver(parentValue) {
        return ProductType
          .findById(parentValue._id)
          .populate("category")
          .then(product => product.category);
      }
    }
  })
    
})

module.exports = ProductType;
