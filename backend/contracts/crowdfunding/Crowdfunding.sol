// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import './Project.sol';

contract Crowdfunding {
    using SafeMath for uint256;

    // List of existing projects
    Project[] private projects;
    uint public projectsCount;

    // Event that will be emitted whenever a new project is started
    event ProjectCreated(
        uint projectId,
        address contractAddress,
        address projectFounder,
        string projectTitle,
        string projectDescription,
        uint256 deadline,
        uint256 goalAmount
    );

    function startProject(
        string calldata title,
        string calldata description,
        uint durationInDays,
        uint amountToRaise
    ) external {
        uint raiseUntil = block.timestamp.add(durationInDays.mul(1 days));
        Project newProject = new Project(
          payable(msg.sender), title, description, raiseUntil, amountToRaise
        );
        projects.push(newProject);
        projectsCount = projectsCount.add(1);
        emit ProjectCreated(
            projectsCount,
            address(newProject),
            msg.sender,
            title,
            description,
            raiseUntil,
            amountToRaise
        );
    }                                                                                                                                   
    function returnAllProjects() external view returns(Project[] memory){
        return projects;
    }
}
