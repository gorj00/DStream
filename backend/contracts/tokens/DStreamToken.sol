// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DStreamToken is ERC20 {
  using SafeMath for uint256;

  event StreamRewardLog(address user, uint videoId, uint date, uint amount);

  constructor() ERC20("DStream Token", "DST") {
    _mint(msg.sender, 1000000 * 10 ** decimals());
    _approve(msg.sender, address(this), 10 ** 18);
  }

  function sendAwards(address from, address to, uint videoId) public {
    approve(msg.sender, 100 * 10 ** decimals());
    transferFrom(from, to, 100 * 10 ** decimals());
    emit StreamRewardLog(to, videoId, block.timestamp, 100 * 10 ** decimals());
  }

}
