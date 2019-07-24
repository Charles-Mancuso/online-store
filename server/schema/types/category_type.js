const mongoose = require("mongoose");
const graphql = require("graphql");

const ProductType = require("./product_type");
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID, 
  GraphQLList 
} = graphql;

const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    // remember we wrap the fields in a thunk to avoid circular dependency issues
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        products: {
          type: new GraphQLList(ProductType),
          resolve(parentValue) {
            return CategoryType.findProducts(parentValue._id)
          }
        }
    })
});

module.exports = CategoryType;