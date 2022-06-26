require('dotenv').config();
const chai = require('chai')
const { assert } = chai;
const should = chai.should();
chai.use(require('chai-as-promised'));

const DStreamInvestNFT = artifacts.require('DStreamInvestNFT')
const networks = require('../../abis/DStreamInvestNFT.json').networks;
const { EVM_REVERT, ZERO_ADDRESS } = require('../utils/helpers')

// REQUIRE ADDRESS LINE MUST BE COMMENTED OUT FOR THE TEST
contract('DStreamInvestNFT', ([user1, user2]) => {
  let NFTContract
  before(async () => {
    // Specific contract on a given network so graph can be monitored if testing graph
    NFTContract = process.env.TRUFFLE_GRAPH_TESTING === 'TRUE' 
                   ? await DStreamInvestNFT.at(networks[process.env.TRUFFLE_DEV_NETWORK_ID].address)
                   : await DStreamInvestNFT.deployed()
  })

  describe('success', () => {
    let initialDate;

    it('mints a nft for user1', async () => {
      const mintResult = await NFTContract.safeMint(user1, 1, 200000, 500000)

      const TransferELog = mintResult.logs[0]
      const { event: transferEvent, args: TransferArgs } = TransferELog;
      const { from, to, tokenId: trEvTokendId } = TransferArgs;
      assert.strictEqual(transferEvent, 'Transfer')
      assert.strictEqual(from, ZERO_ADDRESS)
      assert.strictEqual(to, user1)
      assert.strictEqual(trEvTokendId.toString(), '1')

      const DInvestNFTCreatedELog = mintResult.logs[1]
      const { 
        event: NFTMetadataEvent, args: NFTArgs
      } = DInvestNFTCreatedELog;
      const { 
        tokenId: NFTTokenId, projectId, projectInvestorsRewardsShare, owner 
      } = NFTArgs;
      assert.strictEqual(NFTMetadataEvent, 'DInvestNFTCreated')
      assert.strictEqual(NFTTokenId.toString(), '1')
      assert.strictEqual(projectId.toString(), '1')
      assert.strictEqual(
        projectInvestorsRewardsShare.toString(), '400000000000'
      )
      assert.strictEqual(owner, user1)


    })

    it('tracks stored metadata for the freshly minted NFT', async () => {
      const NFTMetadata = await NFTContract.sharesByTokenId(1)

      assert.strictEqual(NFTMetadata.tokenId.toString(), '1')
      assert.strictEqual(NFTMetadata.projectId.toString(), '1')
      assert.strictEqual(
        NFTMetadata.projectInvestorsRewardsShare.toString(), '400000000000'
      )
      assert.strictEqual(NFTMetadata.owner, user1)
    })

    it('trasnfers NFT from user1 to user2', async () => {
      const NFTTransfer = await NFTContract.safeTransferFrom(
        user1, user2, 1, { from: user1 }
      )
      const ApprovalELog = NFTTransfer.logs[0]
      const { event: approvalEvent } = ApprovalELog
      assert.strictEqual(approvalEvent, 'Approval')

      const TransferELog = NFTTransfer.logs[1]
      const { event: transferEvent, args: TransferArgs } = TransferELog;
      const { from, to, tokenId: trEvTokendId } = TransferArgs;
      assert.strictEqual(transferEvent, 'Transfer')
      assert.strictEqual(from, user1)
      assert.strictEqual(to, user2)
      assert.strictEqual(trEvTokendId.toString(), '1')

      const OwnerChangedELog = NFTTransfer.logs[2]
      const { event: OCEvent, args: OwnerChangedArgs } = OwnerChangedELog;
      const { newOwner, tokenId: OCEvTokendId } = OwnerChangedArgs;
      assert.strictEqual(OCEvent, 'OwnerChanged')
      assert.strictEqual(OCEvTokendId.toString(), '1')
      assert.strictEqual(newOwner, user2)
    })

    it('updates stored metadata for the freshly transfered NFT', async () => {
      const NFTMetadata = await NFTContract.sharesByTokenId(1)

      assert.strictEqual(NFTMetadata.tokenId.toString(), '1')
      assert.strictEqual(NFTMetadata.projectId.toString(), '1')
      assert.strictEqual(
        NFTMetadata.projectInvestorsRewardsShare.toString(), '400000000000'
      )
      assert.strictEqual(NFTMetadata.owner, user2)
    })
  })


})
