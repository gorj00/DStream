require('dotenv').config();
const chai = require('chai')
const { assert } = chai;
const should = chai.should();
chai.use(require('chai-as-promised'));

const User = artifacts.require('User')
const networks = require('../../abis/User.json').networks;
const { EVM_REVERT, ZERO_ADDRESS } = require('../utils/helpers')

contract('User registers, logs in, and logs out, failures', ([user1, user2]) => {
  let UserContract
  before(async () => {
    // Specific contract on a given network so graph can be monitored if testing graph
    UserContract = process.env.TRUFFLE_GRAPH_TESTING === 'TRUE' 
                   ? await User.at(networks[process.env.TRUFFLE_DEV_NETWORK_ID].address)
                   : await User.deployed()
  })

  describe('success', () => {
    let initialDate;

    it('registers a new user', async () => {
      const registrationResult = await UserContract.register(user1, { from: user1 })
      const log = registrationResult.logs[0]
      assert.equal(log.event, 'UserRegistered')
    })

    it('retrieves a registered user with its props', async () => {
      const retrievalResult = await UserContract.users(user1)
      const { addr, isLoggedIn, date } = retrievalResult
      initialDate = date;
      assert.strictEqual(addr, user1)
      assert.isFalse(isLoggedIn)
      assert.exists(date)
    })

    it('logins a registered user', async () => {
      const loginResult = await UserContract.login(user1, { from: user1 })
      const log = loginResult.logs[0]
      assert.equal(log.event, 'UserLoginLog')

      const retrievalResult = await UserContract.users(user1)
      const { isLoggedIn, date } = retrievalResult
      assert.isTrue(isLoggedIn)
      assert.notStrictEqual(initialDate, date)
    })

    it('logs out a logged in user', async () => {
      const logoutResult = await UserContract.logout(user1, { from: user1 })
      const log = logoutResult.logs[0]
      assert.equal(log.event, 'UserLoginLog')

      const retrievalResult = await UserContract.users(user1)
      const { isLoggedIn, date } = retrievalResult
      assert.isFalse(isLoggedIn)
      assert.notStrictEqual(initialDate, date)
    })
  })

  describe('failure', () => {
    it('fails on registering an existing user', async () => {
      const registrationPromise = UserContract.register(user1, { from: user1 })
      registrationPromise.should.be.rejectedWith(EVM_REVERT)
    })

    it('fails on retriving an uregistered user', async () => {
      const retrievalResult = await UserContract.users(user2)
      const { addr, isLoggedIn, date } = retrievalResult
      // test for default values
      assert.strictEqual(ZERO_ADDRESS, addr)
      assert.isFalse(isLoggedIn)
      assert.equal(0, date)
    })

    it('fails to log in and log out an unregistered user', async () => {
      const loginPromise = UserContract.login(user2, { from: user2 })
      const logoutPromise = UserContract.logout(user2, { from: user2 })
      loginPromise.should.be.rejectedWith(EVM_REVERT)
      logoutPromise.should.be.rejectedWith(EVM_REVERT)
    })

    it('fails to log in and log out a user by a different user', async () => {
      const loginPromise = UserContract.login(user1, { from: user2 })
      const logoutPromise = UserContract.logout(user1, { from: user2 })
      loginPromise.should.be.rejectedWith(EVM_REVERT)
      logoutPromise.should.be.rejectedWith(EVM_REVERT)
    })

  })

})
