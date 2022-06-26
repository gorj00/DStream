// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DStreamInvestNFT is ERC721 {
  using SafeMath for uint256;

  struct Metadata {
    uint tokenId;
    uint projectId;
    uint projectInvestorsRewardsShare;
    address owner;
  }
  mapping(uint => Metadata) public sharesByTokenId;
  mapping(uint => uint) internal tokensTotalsByProjectId;
  mapping(uint => mapping(uint => uint)) tokensIdsByProjectIdAndOrder;

  uint public decimals = 12;
  uint public tokensCount;

  event DInvestNFTCreated(
    uint tokenId,
    uint projectId,
    uint projectInvestorsRewardsShare,
    address owner
  );

  event OwnerChanged(
    uint tokenId, 
    address newOwner
  );

  constructor() ERC721("DStream Invest NFT", "DInvestNFT") {}

  
  function _getPercentage(uint low, uint high) private view returns (uint) {
    // max contributions in millions (10 ** 6); therefore, max decimal in this calculating 10 ** 18 (6 + 12)
    // decimals (12) is precision, example: 478965654123 = 47,8965654123 %
    return low.mul(10 ** decimals) / high;
  }

  function mintInvestNFT(
    address to, uint projectId, uint contributions, uint total
  ) internal {
    require(msg.sender != address(this));
    tokensCount = tokensCount.add(1);
    _safeMint(to, tokensCount);

    uint share = _getPercentage(contributions, total);
    sharesByTokenId[tokensCount] = Metadata(
      tokensCount, projectId, share, to
    );

    uint newTokensTotalPerProject = tokensTotalsByProjectId[
      projectId
    ].add(1);

    tokensTotalsByProjectId[projectId] = newTokensTotalPerProject;
    tokensIdsByProjectIdAndOrder[projectId][newTokensTotalPerProject] = tokensCount;

    emit DInvestNFTCreated(
      tokensCount, projectId, share, to
    );
  }

  // Hook
  function _afterTokenTransfer(address from, address to, uint256 tokenId)
    internal virtual override
  {
    super._afterTokenTransfer(from, to, tokenId);
    sharesByTokenId[tokenId].owner = to;
    emit OwnerChanged(tokenId, to);
  }

}
