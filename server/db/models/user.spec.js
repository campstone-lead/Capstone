/* global describe beforeEach it */

// mocha server/db/models/user.spec.js

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'Cody',
          lastName: 'ThePug',
          password: '123',
          status: 'user',
          address: '123 Main St',
          email: 'cody@gmail.com'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('123')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('321')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('correct creation', () => {
    let cody

    beforeEach(async () => {
      cody = await User.create({
        firstName: 'Cody',
        lastName: 'ThePug',
        password: '123',
        address: '123 Main St',
        email: 'cody@gmail.com'
      })
    })

    it('expects first name to be a string ', () => {
      expect(typeof cody.firstName).to.be.equal('string')
    })

    it('expects first name to be equal to Cody', () => {
      expect(cody.firstName).to.be.equal('Cody')
    })

    it('expects first name to be a string ', () => {
      expect(typeof cody.lastName).to.be.equal('string')
    })

    it('expects first name to be equal to ThePug', () => {
      expect(cody.lastName).to.be.equal('ThePug')
    })

    it('expects password to be a string ', () => {
      expect(typeof cody.password).to.be.equal('function')
    })

    it('expects status to default to user ', () => {
      expect(cody.status).to.be.equal('user')
    })

    it('expects address to be a string ', () => {
      expect(typeof cody.address).to.be.equal('string')
    })

    it('expects address to be equal to 123 Main St', () => {
      expect(cody.address).to.be.equal('123 Main St')
    })

    it('expects email to be a string ', () => {
      expect(typeof cody.email).to.be.equal('string')
    })

    it('expects email to be equal to cody@gmail.com', () => {
      expect(cody.email).to.be.equal('cody@gmail.com')
    })
  })
}) // end describe('User model')
