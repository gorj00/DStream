// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;
import '@openzeppelin/contracts/access/AccessControl.sol';

contract ProjectRBAC is AccessControl {
  bytes32 public constant ADMIN = keccak256('ADMIN');
  bytes32 public constant EXECUTIVE_PRODUCER = keccak256('EXECUTIVE_PRODUCER');
  bytes32 public constant PRODUCER = keccak256('PRODUCER');

  function createExecutiveProducer(address userAddr) public onlyRole(ADMIN) {
    require(
      !hasRole(EXECUTIVE_PRODUCER, userAddr), 
      'User is an executive producer already!'
    );
    grantRole(EXECUTIVE_PRODUCER, userAddr);
    // Executive producer is also a producer automatically
    if (!hasRole(PRODUCER, userAddr)) {
        grantRole(PRODUCER, userAddr);
    }
  }

  function createProducer(address userAddr) public onlyRole(EXECUTIVE_PRODUCER) {
    require(
      !hasRole(PRODUCER, userAddr), 
      'User is a producer already!'
    );
    grantRole(PRODUCER, userAddr);
  }

  function removeExecutiveProducer(address userAddr) public {
    require(hasRole(ADMIN, msg.sender), "Caller is not an admin");
    require(
      hasRole(EXECUTIVE_PRODUCER, msg.sender), 
      "Caller is not an executive producer"
    );
    require(
      hasRole(EXECUTIVE_PRODUCER, userAddr), 
      'User is not an executive producer!'
    );
    revokeRole(EXECUTIVE_PRODUCER, userAddr);
    if (hasRole(PRODUCER, userAddr)) {
      revokeRole(PRODUCER, userAddr);
    }
  }

  function demoteExecutiveProducer(address userAddr) public {
    require(hasRole(ADMIN, msg.sender), "Caller is not an admin");
    require(
      hasRole(EXECUTIVE_PRODUCER, msg.sender), 
      "Caller is not an executive producer"
    );
    require(
      hasRole(EXECUTIVE_PRODUCER, userAddr), 
      'User is not an executive producer!'
    );
    revokeRole(EXECUTIVE_PRODUCER, userAddr);
    if (!hasRole(PRODUCER, userAddr)) {
      grantRole(PRODUCER, userAddr);
    }
  }

  function removeProducer(address userAddr) 
    public onlyRole(EXECUTIVE_PRODUCER) 
  {
    require(
      hasRole(PRODUCER, userAddr), 
      'User is not a producer!'
    );
    revokeRole(PRODUCER, userAddr);
  }

}
