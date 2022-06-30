require('dotenv').config();
const chai = require('chai')
const { assert } = chai;
const should = chai.should();
chai.use(require('chai-as-promised'));

const DStreamToken = artifacts.require('DStreamToken')
const networks = require('../../../abis/DStreamToken.json').networks;
const { EVM_REVERT, tokens } = require('../../utils/helpers')

// REQUIRE ADDRESS LINE MUST BE COMMENTED OUT FOR THE TEST
contract('DStreamToken', ([deployer, streamer, receiver, failReceiver]) => {
  let Token
  let tokenContractAddr = networks[process.env.TRUFFLE_DEV_NETWORK_ID].address;
  before(async () => {
    // Specific contract on a given network so graph can be monitored if testing graph
    Token = process.env.TRUFFLE_GRAPH_TESTING === 'TRUE' 
                   ? await DStreamToken.at(networks[process.env.TRUFFLE_DEV_NETWORK_ID].address)
                   : await DStreamToken.deployed()
  })

  describe('deployment', () => {

    it('mints the supply and provides it', async () => {
      const supply = await Token.totalSupply()
      // million DST
      assert.strictEqual(supply.toString(), '1000000000000000000000000') 
    })

    it('assigns the total supply to the deployer', async () => {
      const deployerBalance = await Token.balanceOf(deployer)
      const supply = await Token.totalSupply()
      assert.strictEqual(deployerBalance.toString(), supply.toString()) 
    })

    it('sends rewards to streamer by deployer', async () => {
      const sendRewardsRequest = await Token.sendAwards(deployer, streamer, 1, { from: deployer })
      const balance = await Token.balanceOf(streamer)
      assert.strictEqual(balance.toString(), '100000000000000000000') 
    })

  })

  describe('sending tokens', () => {
    let amount;
    let result;

    describe('success', () => {
      beforeEach(async () => {
        amount = tokens(100);
        result = await Token.transfer(receiver, amount, {from: deployer});
      });
      it('transfers Token balances', async () => {
        let balanceOf;
        // Transfer

        balanceOf = await Token.balanceOf(deployer);
        balanceOf.toString().should.equal(tokens(999800).toString());
        balanceOf = await Token.balanceOf(receiver);
        balanceOf.toString().should.equal(tokens(100).toString());
      });

      it('emits a Transfer event', async () => {
        const log = result.logs[0];
        log.event.should.equal('Transfer');
        const event = log.args;
        event.from.toString().should.equal(deployer, 'from is correct');
        event.to.should.equal(receiver, 'to is correct');
        event.value
          .toString()
          .should.equal(amount.toString(), 'value is correct');
      });
    });

    describe('failure', () => {
      it('rejects insufficient balances', async () => {
        let invalidAmount;
        invalidAmount = tokens(100000000); // 100 million - greater than total supply
        await Token
          .transfer(failReceiver, invalidAmount, {from: deployer})
          .should.be.rejectedWith(EVM_REVERT);
        // Attempt transfer tokens when you have none
        invalidAmount = tokens(10); // recipient has no tokens
        await Token
          .transfer(deployer, invalidAmount, {from: failReceiver})
          .should.be.rejectedWith(EVM_REVERT);
      });

      it('rejects invalid recipients', async () => {
        await Token.transfer(0x0, amount, {from: deployer}).should.be
          .rejected;
      });
    });
  });


})
