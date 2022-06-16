require('dotenv').config();
const chai = require('chai')
const fs = require('fs');
const path = require("path");
const { assert } = chai;
const should = chai.should();
chai.use(require('chai-as-promised'));
const Video = artifacts.require('Video')
const networks = require('../../abis/Video.json').networks;
const { EVM_REVERT, ZERO_ADDRESS } = require('../utils/helpers')
const { create } = require('ipfs-core')

// REQUIRES RUNNING AN IPFS
contract('handling uploaded video to ipfs', ([user1, user2]) => {
  let VideoContract
  let videoCid
  let videoFile
  let ipfs
  // does not support require, handled qith a stored import   

  before(async () => {
    ipfs = !ipfs && await create()
    console.log(create, ipfs)

    // Specific contract on a given network so graph can be monitored if testing graph
    VideoContract = process.env.TRUFFLE_GRAPH_TESTING === 'TRUE' 
                   ? await Video.at(networks[process.env.TRUFFLE_DEV_NETWORK_ID].address)
                   : await Video.deployed()
    const videaPath = './../../../dev/media/video-short.mp4'

    try { 
        videoFile = fs.readFileSync(path.resolve(__dirname, videaPath));
    } catch (err) { 
        console.error(err);
    }
  })

  describe('video upload', () => {
    it('tracks', async () => {

        console.log('YAP2 ', ipfs)
        console.log('YAP ', videoFile)

    })
  })
})