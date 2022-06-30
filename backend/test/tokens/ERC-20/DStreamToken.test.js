require('dotenv').config();
const chai = require('chai')
const { assert } = chai;
const should = chai.should();
chai.use(require('chai-as-promised'));

const DStreamToken = artifacts.require('DStreamToken')
const networks = require('../../../abis/DStreamToken.json').networks;
const { EVM_REVERT, ZERO_ADDRESS } = require('../../utils/helpers')

// REQUIRE ADDRESS LINE MUST BE COMMENTED OUT FOR THE TEST
contract('DStreamToken', ([deployer, streamer]) => {
  let Token
  let tokenContractAddr = networks[process.env.TRUFFLE_DEV_NETWORK_ID].address;
  before(async () => {
    // Specific contract on a given network so graph can be monitored if testing graph
    Token = process.env.TRUFFLE_GRAPH_TESTING === 'TRUE' 
                   ? await DStreamToken.at(networks[process.env.TRUFFLE_DEV_NETWORK_ID].address)
                   : await DStreamToken.deployed()
  })

  describe('success', () => {
// 
    it('mints the supply and provides it', async () => {
      const supply = await Token.totalSupply()
      // million DST
      assert.strictEqual(supply.toString(), '1000000000000000000000000') 
    })

    it('sends rewards to streamer', async () => {
      const sendRewardsRequest = await Token.sendAwards(deployer, streamer, 1)
      const balance = await Token.balanceOf(streamer)
      // 100000000000000000000
      console.log('BALANCE ', balance.toString())
    })

  })


})
