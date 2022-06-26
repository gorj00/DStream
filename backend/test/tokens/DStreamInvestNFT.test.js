require('dotenv').config();
const chai = require('chai')
const { assert } = chai;
const should = chai.should();
chai.use(require('chai-as-promised'));

const DStreamInvestNFT = artifacts.require('DStreamInvestNFT')
const networks = require('../../abis/DStreamInvestNFT.json').networks;
const { EVM_REVERT, ZERO_ADDRESS } = require('../utils/helpers')

contract('DStreamInvestNFT', ([user1, user2]) => {
  let UserContract
  before(async () => {
    // Specific contract on a given network so graph can be monitored if testing graph
    UserContract = process.env.TRUFFLE_GRAPH_TESTING === 'TRUE' 
                   ? await DStreamInvestNFT.at(networks[process.env.TRUFFLE_DEV_NETWORK_ID].address)
                   : await DStreamInvestNFT.deployed()
  })

  describe('success', () => {
    let initialDate;

    it('registers a new user', async () => {
      const registrationResult = await UserContract.register(user1, { from: user1 })
      const log = registrationResult.logs[0]
      assert.equal(log.event, 'UserRegistered')
    })


})
