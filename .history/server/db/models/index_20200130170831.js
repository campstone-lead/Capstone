const User = require('./user')
const Product = require('./products')
const Order = require('./order')
const ProductOrder = require('./product-orders')
const Recipe = require('./recipe')
const RecipeProduct = require('./recipe-product')

///ASSOCIATIONS HERE:
Order.belongsTo(User, {allowNull: true})
User.hasMany(Order)

Product.belongsToMany(Order, {through: ProductOrder})
Order.belongsToMany(Product, {through: ProductOrder})

Recipe.belongsToMany(Product, {through: RecipeProduct})
Product.belongsToMany(Recipe, {through: RecipeProduct})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Product,
  Order,
  ProductOrder,
  Recipe,
  RecipeProduct
}
