// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DStreamToken is ERC20 {
  using SafeMath for uint256;

  mapping(uint => uint) streamLogsCountByVideoId;

  event StreamRewardLogAdded(
    address user, uint videoId, uint count, uint date, uint amount
  );

  constructor() ERC20("DStream Token", "DST") {
    _mint(msg.sender, 1000000 * 10 ** decimals());
    _approve(msg.sender, address(this), 1000000 * 10 ** decimals());
  }

  // will work only for the creator unless user have sufficient token already
  function sendAwards(address from, address to, uint videoId) public {
    approve(msg.sender, 100 * 10 ** decimals());
    transferFrom(from, to, 100 * 10 ** decimals());
    streamLogsCountByVideoId[videoId] = streamLogsCountByVideoId[videoId].add(1);
    emit StreamRewardLogAdded(
      to, 
      videoId, 
      streamLogsCountByVideoId[videoId], 
      block.timestamp, 
      100 * 10 ** decimals()
    );
  }

}
