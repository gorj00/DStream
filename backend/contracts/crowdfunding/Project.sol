// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

contract Project is AccessControl {
  using SafeMath for uint256;

  bytes32 public constant ADMIN = keccak256('ADMIN');
  bytes32 public constant EXECUTIVE_PRODUCER = keccak256('EXECUTIVE_PRODUCER');
  bytes32 public constant PRODUCER = keccak256('PRODUCER');
    
  // Data structures
  enum State {
    Fundraising,
    Expired,
    Successful,
    Cancelled
  }

  // State variables
  address payable public founder;
  uint public amountGoal; // required to reach at least this much, else everyone gets refund
  uint public completeAt;
  uint256 public currentBalance;
  uint public raiseBy;
  string public title;
  string public description;
  State public state = State.Fundraising; // initialize on create
  mapping (address => uint) public contributions;

  // Event that will be emitted whenever funding will be received
  event FundingReceived(address contributor, uint amount, uint currentTotal);
  // Event that will be emitted whenever the project starter has received the funds
  event FounderPaid(address recipient);

  // Modifier to check current state
  modifier inState(State _state) {
      require(state == _state);
      _;
  }

  // Modifier to check if the function caller is the project founder
  modifier isFounder() {
      require(msg.sender == founder);
      _;
  }

  constructor (
    address payable projectFounder,
    string memory projectTitle,
    string memory projectDescription,
    uint fundRaisingDeadline,
    uint goalAmount
  ) {
      founder = projectFounder;
      title = projectTitle;
      description = projectDescription;
      amountGoal = goalAmount;
      raiseBy = fundRaisingDeadline;
      currentBalance = 0;

      // Roles setup
      _setRoleAdmin(ADMIN, ADMIN); // execs are t
      _setRoleAdmin(EXECUTIVE_PRODUCER, ADMIN);
      _setRoleAdmin(PRODUCER, EXECUTIVE_PRODUCER);

      _setupRole(ADMIN, projectFounder);
      _setupRole(EXECUTIVE_PRODUCER, projectFounder);
      _setupRole(PRODUCER, projectFounder);
  }

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

  function contribute() external inState(State.Fundraising) payable {
    contributions[msg.sender] = contributions[msg.sender].add(msg.value);
    currentBalance = currentBalance.add(msg.value);
    emit FundingReceived(msg.sender, msg.value, currentBalance);
    checkIfFundingCompleteOrExpired();
  }

  function checkIfFundingCompleteOrExpired() public {
    if (currentBalance >= amountGoal) {
        state = State.Successful;
        payOut();
    } else if (block.timestamp > raiseBy)  {
        state = State.Expired;
    }
    completeAt = block.timestamp;
  }

  function payOut() internal inState(State.Successful) returns (bool) {
    uint256 totalRaised = currentBalance;
    currentBalance = 0;

    if (founder.send(totalRaised)) {
        emit FounderPaid(founder);
        return true;
    } else {
        currentBalance = totalRaised;
        state = State.Successful;
    }

    return false;
  }

  function getRefund() public inState(State.Expired) returns (bool) {
    require(contributions[msg.sender] > 0);

    uint amountToRefund = contributions[msg.sender];
    contributions[msg.sender] = 0;

    if (!payable(msg.sender).send(amountToRefund)) {
        contributions[msg.sender] = amountToRefund;
        return false;
    } else {
        currentBalance = currentBalance.sub(amountToRefund);
    }

    return true;
  }

  function getDetails() public view returns (
    address payable projectFounder,
    string memory projectTitle,
    string memory projectDescription,
    uint256 deadline,
    State currentState,
    uint256 currentAmount,
    uint256 goalAmount
  ) {
      projectFounder = founder;
      projectTitle = title;
      projectDescription = description;
      deadline = raiseBy;
      currentState = state;
      currentAmount = currentBalance;
      goalAmount = amountGoal;
  }
}
