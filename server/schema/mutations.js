const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");

const UserType = require("../schema/types/user_type");
const CategoryType = require("../schema/types/category_type");
const ProductType = require("../schema/types/product_type");
const AuthService = require("../services/auth");
const Category = mongoose.model("categories");
const Product = mongoose.model("products");

const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newCategory: {
      type: CategoryType,
      args: { name: { type: GraphQLString } },
      resolve(parentValue, { name }) { return new Category({ name }).save(); }
    },
    deleteCategory: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Category.remove({ _id: id });
      }
    },
    newProduct: {
      type: ProductType,
      args: { 
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        weight: { type: GraphQLInt }
      },
      resolve(_, { name, description, weight }) {
        return new Product({ name, description, weight }).save();
      }
    },
    deleteProduct: {
      type: ProductType,
      args: { _id: { type: GraphQLID } },
      resolve(_, { _id }) { return Product.remove({ _id: id }); }
    },
    updateProductCategory: {
      type: ProductType,
      args: {
        productId: { type: GraphQLID },
        categoryId: { type: GraphQLID }
      },
      resolve(_, { productId, categoryId }) {
        return Product.updateProductCategory(productId, categoryId)
      }
    },
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) { return AuthService.register(args) }
    },
    logout: {
      type: UserType,
      args: { _id: { type: GraphQLID } },
      resolve(_, args) { return AuthService.logout(args) }
    },
    login: {
      type: UserType,
      args: {
          email: { type: GraphQLString },
          password: { type: GraphQLString }
      },
      resolve(_, args) { return AuthService.login(args) }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    }
  }
});

module.exports = mutations;
