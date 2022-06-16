// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

contract User {
  struct UserType {
      address addr;
      bool isLoggedIn;
      uint256 date;
  }

  mapping(address => UserType) public users;
  event UserRegistered(address addr);
  event UserLoginLog(address addr, bool isLoggedIn, uint256 date);

  function register(address _address) 
      public 
      returns (bool) 
  {
    require(users[_address].addr != msg.sender);
    users[_address].addr = _address;
    users[_address].isLoggedIn = false;
    users[_address].date = block.timestamp;
    emit UserRegistered(_address);
    return true;
  }

  function login(address _address) public returns (bool) {
    require(users[_address].addr == msg.sender);
    require(users[_address].isLoggedIn == false);
    users[_address].isLoggedIn = true;
    users[_address].date = block.timestamp;

    emit UserLoginLog(
      users[_address].addr,
      users[_address].isLoggedIn,
      users[_address].date
    );
    return true;
  }

  function logout(address _address) public returns (bool) {
    require(users[_address].addr == msg.sender);
    require(users[_address].isLoggedIn == true);
    users[_address].isLoggedIn = false;
    users[_address].date = block.timestamp;

    emit UserLoginLog(
      users[_address].addr,
      users[_address].isLoggedIn,
      users[_address].date
    );
    return true;
  }
}
