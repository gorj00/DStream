// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract Video {
  using SafeMath for uint;

  struct VideoType {
    uint id;
    string ipfsCid;
    uint dateCreated;
    address uploader;
    uint projectId;
  }

  uint public videosCount;
  mapping(uint => VideoType) public videos;

  event VideoEntryAdded(
    uint id, string ipfsCid, uint dateCreated, address uploader, uint projectId
  );

  function createVideoEntry(
    string memory _ipfsCid, address _uploader, uint _projectId
  ) public returns (bool) {
    // must be executive producer and msg.sender must be user
    require(_uploader == msg.sender);
    videosCount = videosCount.add(1);

    videos[videosCount].id = videosCount;
    videos[videosCount].ipfsCid = _ipfsCid;
    videos[videosCount].dateCreated = block.timestamp;
    videos[videosCount].uploader = _uploader;
    videos[videosCount].projectId = _projectId;

    emit VideoEntryAdded(
      videos[videosCount].id,
      videos[videosCount].ipfsCid,
      videos[videosCount].dateCreated,
      videos[videosCount].uploader,
      videos[videosCount].projectId
    );
    return true;
  }

}
