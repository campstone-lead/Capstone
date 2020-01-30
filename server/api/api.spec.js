/* global describe beforeEach it */

const {expect} = require('chai')

const db = require('../db')
const app = require('../index')
const {Product, User, Recipe, RecipeProduct} = require('../db/models')
const agent = require('supertest')(app)
describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Product Routes', () => {
    const products = [
      {
        id: 1,
        name: 'Tomato',
        price: 1.89,
        weight: '0.5oz',
        imgSrc:
          'https://www.myemarket.in/image/cache/data/Vegetables/10000200_16-fresho-tomato-hybrid-600x600.jpg',
        category: 'Vegetable',
        stockQuantity: 150
      },
      {
        id: 2,
        name: 'Mango',
        price: 2.99,
        weight: '0.5oz',
        imgSrc:
          'https://www.myemarket.in/image/cache/data/Vegetables/MUSHRUMS-600x600.jpg',
        category: 'Fruit',
        stockQuantity: 200
      }
    ]

    beforeEach(async () => {
      await Product.bulkCreate(products)
    })

    it('GET /api/products', async () => {
      const res = await agent.get('/api/products/').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body).to.have.length(2)
      expect(res.body[0].name).to.be.equal('Tomato')
    })
    it('GET /api/products/:id', async () => {
      const res = await agent.get('/api/products/2').expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Mango')
    })
    it('PUT /api/delete/:id', async () => {
      await agent.delete('/api/products/2').expect(200)
      const allProducts = await agent.get('/api/products')
      expect(allProducts.body).to.have.length(1)
    })
    it('CATEGORY /api/category', async () => {
      const response = await agent.get('/api/products/filter/Fruit')
      expect(response.body).to.be.an('array')
      expect(response.body[0].name).to.be.equal('Mango')
    })
  })

  describe('User Routes', () => {
    const users = [
      {
        firstName: 'Liana',
        status: 'admin',
        lastName: 'Chan',
        address: '123 Magnolia Ave.,NY 11206',
        email: 'liana.andreea97@yahoo.com',
        password: '123',
        imageURL:
          'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/107/profiles/2394/profileImage/avatar-new400.jpg'
      },
      {
        firstName: 'Celia',
        lastName: 'Macrae',
        status: 'user',
        address: '309 E 52nd St., New York, NY 10022',
        email: 'celiamacrae@gmail.com',
        password: '123',
        imageURL:
          'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/107/profiles/2394/profileImage/avatar-new400.jpg'
      }
    ]

    beforeEach(async () => {
      await User.bulkCreate(users)
    })

    it('GET /api/users', async () => {
      const res = await agent.get('/api/users/').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body).to.have.length(2)
      expect(res.body[0].firstName).to.be.equal('Liana')
    })
    it('GET /api/users/:id', async () => {
      const res = await agent.get('/api/users/2').expect(200)

      expect(res.body.firstName).to.be.equal('Celia')
    })
    it('DELETE /api/users/:id', async () => {
      await agent.delete('/api/users/1').expect(204)
      const allProducts = await agent.get('/api/users')
      expect(allProducts.body).to.have.length(1)
    })
  })

  describe('Recepies routes', () => {
    const recipies = [
      {
        id: 1,
        name: 'Onion and mushrooms omelette',
        description:
          'Crack the eggs into a bowl and add a pinch of salt. Whisk until well beaten, then set aside.',
        imageURL:
          'https://www.seriouseats.com/recipes/images/2016/04/20160418-american-omelet-ham-and-cheese-21-1500x1125.jpg'
      }
    ]

    beforeEach(async () => {
      await Recipe.bulkCreate(recipies)
    })

    it('GET /api/recipies', async () => {
      const res = await agent.get('/api/recipies').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Onion and mushrooms omelette')
    })
  })
})
