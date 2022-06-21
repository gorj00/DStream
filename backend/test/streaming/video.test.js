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
// const { create } = require('ipfs-core');
const { expect } = require('chai');
const tmp = require('tmp');
// const ffmpeg = require('fluent-ffmpeg');
// const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

// const ffmpeg = createFFmpeg({ log: true });
// Might take a while, better start as early as possible
// (async () => {
//   await ffmpeg.load();
//   console.log("ready");
// })();
const ipfsClient = require('ipfs-http-client');

const projectId = process.env.INFURA_ID;
const projectSecret = process.env.INFURA_KEY;
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

// REQUIRES RUNNING AN IPFS
contract('handling uploaded video to ipfs', ([user1, user2]) => {
  let VideoContract
  let videoCid
  let videoFile
  let videoSize
  let ipfs
  let client
  let globSource
  let tempDir
  let videoPath
  let hlsFolder
  // does not support require, handled qith a stored import   

  before(async () => {
    // ipfs = !ipfs ? await create() : ipfs
    // console.log('HEY ', process.env.INFURA_GATEWAY)
  client = await ipfsClient.create({
      host: process.env.INFURA_PIN,
      port: 5001,
      protocol: 'https',
      headers: {
          authorization: auth,
      },
  });
  globSource = ipfsClient.globSource
    // Specific contract on a given network so graph can be monitored if testing graph
    VideoContract = process.env.TRUFFLE_GRAPH_TESTING === 'TRUE' 
                   ? await Video.at(networks[process.env.TRUFFLE_DEV_NETWORK_ID].address)
                   : await Video.deployed()
    videoPath = `C:\\Users\\HONZAG~1\\AppData\\Local\\Temp\\dstream-28508-iWdUuxptpbEI-.m3u8`
    // videoPath = './../../../dev/media/video-short.mp4'
    tempDir = path.resolve(__dirname, './../../../dev/media/temp')
    hlsFolder = path.resolve(__dirname, './../../../dev/media/video-short-hls')

    try { 
      // console.log(fs.readFileSync(path.resolve(videoPath).replace(/\\/g, '/')))
        // videoFile = await fs.readFileSync(path.resolve(''));
                videoFile = fs.readFileSync(path.resolve(videoPath).replace(/\\/g, '/'));
        videoSize =  fs.statSync(path.resolve(__dirname, videoPath)).size
    } catch (err) { 
        console.error(err);
    }
  })

  // describe('video upload as mp4', () => {
    // it('uploads video to ipfs', async () => {
  //     let uploadedProgress
  //     const videoAddedToIpfs = await client.add(
  //       videoFile, 
  //       { progress: (size) => {
  //           uploadedProgress = size;
  //           console.log(
  //             size, ' of approx ', 
  //             videoSize, ' === ', 
  //             Math.round(size / videoSize * 100), 
  //             '%'
  //           )
  //         }
  //       }
  //     )
  //     const { path: cid } = videoAddedToIpfs
  //     videoCid = cid;
  //     console.log(videoAddedToIpfs)
  //     assert.strictEqual(+videoSize, +uploadedProgress)
  //     assert.isTrue(cid.startsWith('Qm'))
  //     assert.isTrue(cid.length === 46)
    // })

  describe('video upload as HLS', () => {
  //   it('uploads video to ipfs', async () => {
  //     // let uploadedProgress
  //     // const videoAddedToIpfs = await client.add(
  //     //   videoFile, 
  //     //   { progress: (size) => {
  //     //       uploadedProgress = size;
  //     //       console.log(
  //     //         size, ' of approx ', 
  //     //         videoSize, ' === ', 
  //     //         Math.round(size / videoSize * 100), 
  //     //         '%'
  //     //       )
  //     //     }
  //     //   }
  //     // )
  //     // const { path: cid } = videoAddedToIpfs
  //     // videoCid = cid;
  //     // console.log(videoAddedToIpfs)
  //     // assert.strictEqual(+videoSize, +uploadedProgress)
  //     // assert.isTrue(cid.startsWith('Qm'))
  //     // assert.isTrue(cid.length === 46)
  //     //options specific to globSource
  //       // const globSourceOptions = {
  //       //   recursive: true
  //       // };

  //       //example options to pass to IPFS
  //       const addOptions = {
  //         pin: true,
  //         wrapWithDirectory: true,
  //         // timeout: 10000
  //       };

  //       for await (const file of client.addAll(fs.readdirSync(path.resolve(__dirname, './../../../dev/media/HLS')), addOptions)) {
  //         console.log(file)
  //       }
  //   })

    // it('tracks downloaded part of the video', async () => {
    //   const videoRetrievedFromIpfs = await ipfs.cat(videoCid)
    //   const ipfsFileStats = await ipfs.files.stat(`/ipfs/${videoCid}`)
    //   const { cumulativeSize } = ipfsFileStats
    //   console.log(ipfsStats)
    // })

it('uploads HLS folder as HLS playlist to ipfs', async () => {
  uploadFiles = []
  const name = 'example'

  // let files = await fs.readdirSync(hlsFolder);
  // files
  //   .filter(file => file.substr(file.indexOf('.'), file.length) !== ".m3u8")
  //   .forEach(function (file) {
  //     uploadFiles.push({
  //       path: name + "/" + file,
  //       content: fs.createReadStream(hlsFolder + "/" + file)
  //     })
  //   })

  


  // const addedFiles = await client.addAll(uploadFiles)
  // for await (const result of addedFiles) {
  //   console.log(result)
  // }

  const pinnedFiles = [
    {
  path: 'example/video-short0.ts',
  cid: 'QmU4eHAQHPSk6ery5B5wfcbLqzwcJkQYnbb4gqoeBDEjny',
},
{
  path: 'example/video-short1.ts',
  cid: 'QmVySQFhaw58A6m1uMK6gg2aeWZh5LP5P1MrdJHx9d2zyw',
  size: 8292606
},
{
  path: 'example',
  cid: 'QmRvaEsGLBrLZeVqBiSMrHPGU7poJweX9pLR2gxwdV8YWT',
  size: 45921596
}
  ]

let playlist = await fs.readFileSync(hlsFolder + "/" + 'video-short' + '.m3u8', "utf8")

  pinnedFiles.forEach(function(file) { 
    split = file.path.split('/')
    if (split.length > 1) {
      segment = split[split.length-1]

      playlist = playlist.replace(segment, `https://${process.env.INFURA_GATEWAY}/ipfs/${file.cid}`)
    }

  } )

  const tempHlsFile = tmp.fileSync({prefix: 'dstream', postfix: '.m3u8'});
      fs.appendFile(tempHlsFile.name, playlist, function (err) {
      if (err)
        throw err
    }); 

    readPlaylist(tempHlsFile.name, (err, file) => {
      // if (file) {
                console.log('error: ', err)

        console.log('FILE: ', file)
      // }
    })
    // let fileData
    //     fs.readFile(tempHlsFile.name, (err, data) => {
    //       fileData = data
    //     // hash = cid
    //     });
    //     console.log(fileData)
        // console.log(hash)
        // console.log(video)


        //   const playlistAddedToIpfs = await client.add(
        // video, 
        // // videoFile,
        // { progress: (size) => {
        //     uploadedProgress = size;
        //     console.log(
        //       size, ' of approx ', 
        //       videoSize, ' === ', 
        //       Math.round(size / videoSize * 100), 
        //       '%'
        //     )
        //   }
        // })

        // const { path: cid } = playlistAddedToIpfs
        // console.log(playlistAddedToIpfs, cid)
// console.log(tempHlsFile)
      // const playlistAddedToIpfs = await client.add(
      //   tempHlsFile.path, 
      //   { progress: (size) => {
      //       uploadedProgress = size;
      //       console.log(
      //         size, ' of approx ', 
      //         videoSize, ' === ', 
      //         Math.round(size / videoSize * 100), 
      //         '%'
      //       )
      //     }
      //   })

      //   const { path: cid } = playlistAddedToIpfs
      //   console.log(playlistAddedToIpfs, cid)
// console.log(tempHlsFile)



  

  // console.log(tempDir + name + ".m3u8")
  // console.log(playlist)

  // fs.writeFileSync(tempDir + name + ".m3u8", data, "utf8", function(err) { 
  //   if (err) { 
  //     console.log("couldn't save the playlist file to playlist directory")
  //   } else { 
  //     console.log(err)
  //   }
  // })
});
// await addedFiles.forEach(hash => console.log(hash))

  // , (err, files) => {
  //   if (!err) {
  //     console.log("uploaded to ipfs")
  //   } else { 
  //     console.log(err)
  //   }
  //   console.log(files)

  //   fs.readFile(tempDir + "/" + name + '.m3u8', "utf8", function(err, data) {
  //     files.forEach(function(ipfsHash) { 
  //       split = ipfsHash.path.split('/')
  //       segment = split[split.length-1]

  //       data = data.replace(segment, `https://${process.env.INFURA_GATEWAY}/ipfs/${ipfsHash.hash}`)
  //     })

  //     fs.writeFile(tempDir + name + ".m3u8", data, "utf8", function(err) { 
  //       if (err) { 
  //         console.log("couldn't save the playlist file to playlist directory")
  //       } else { 
  //         console.log(err)
  //       }
  //     })
  //   });
  // }

// })

  })
})
