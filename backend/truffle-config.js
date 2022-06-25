// require('babel-register');
// require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: process.env.TRUFFLE_DEV_NETWORK_ID,       // Any network (default: none)
    },
    polygon_testnet: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC, 
        `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
        ),
      network_id: 80001,
      confirmations: 0,
      timeoutBlocks: 200,
      skipDryRun: true,
      disableConfirmationListener: true,
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  contracts_directory: "./contracts/**/*.sol",
  contracts_build_directory: './abis/',
  // test_directory: './test/',
  // test_directory: './test/streaming/',
  test_directory: './test/crowdfunding/',

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.14",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       },
      //  evmVersion: "byzantium"
      // }
    }
  },
};
