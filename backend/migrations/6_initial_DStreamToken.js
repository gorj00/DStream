const DStreamToken = artifacts.require("DStreamToken");
module.exports = function (deployer) {
  deployer.deploy(DStreamToken);
};
