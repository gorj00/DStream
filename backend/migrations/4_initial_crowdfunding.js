const Crowdfunding = artifacts.require("Crowdfunding");
// Crowdfunding includes Project
module.exports = function (deployer) {
  deployer.deploy(Crowdfunding);
};
