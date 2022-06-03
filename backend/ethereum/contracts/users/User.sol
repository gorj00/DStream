// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

contract User {
  struct UserType {
      address addr;
      bool isLoggedIn;
  }

  mapping(address => UserType) users;

  function register(address _address) 
      public 
      returns (bool) 
  {
    require(users[_address].addr != msg.sender);
    users[_address].addr = _address;
    users[_address].isLoggedIn = false;
    return true;
  }

  function login(address _address)
      public
      returns (bool)
  {
    require(users[_address].addr == msg.sender);
    users[_address].isLoggedIn = true;
    return users[_address].isLoggedIn;
  }

  function logout(address _address) public returns (bool) {
      require(users[_address].addr == msg.sender);
      users[_address].isLoggedIn = false;
      return true;
  }
}
