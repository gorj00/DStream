require('dotenv').config();
const chai = require('chai')
const { assert } = chai;
const should = chai.should();
chai.use(require('chai-as-promised'));

const Crowdfunding = artifacts.require('Crowdfunding')
const Project = artifacts.require('Project')
const networks = require('../../abis/Crowdfunding.json').networks;
const { EVM_REVERT, ZERO_ADDRESS } = require('../utils/helpers')

contract('Two projects setup', ([user1, user2]) => {
  let CrowdfundingContract
  before(async () => {
    // Specific contract on a given network so graph can be monitored if testing graph
    CrowdfundingContract = process.env.TRUFFLE_GRAPH_TESTING === 'TRUE' 
                   ? await Crowdfunding.at(networks[process.env.TRUFFLE_DEV_NETWORK_ID].address)
                   : await Crowdfunding.deployed()
  })

  describe('success', () => {
    let initialDate;

    it('differntiates user roles of two projects', async () => {
      await CrowdfundingContract.startProject(
        'Example project 1', 
        'DESC',
        70,
        100000,
        { from: user1}
      )
      await CrowdfundingContract.startProject(
        'Example project 2', 
        'DESC',
        70,
        100000,
        { from: user2}
      )
      const projects = await CrowdfundingContract.returnAllProjects()
      const projectOneInstance = await Project.at(projects[0])
      const projectTwoInstance = await Project.at(projects[1])
      const pOneExecRole = await projectOneInstance.EXECUTIVE_PRODUCER.call()
      const pTwoExecRole = await projectTwoInstance.EXECUTIVE_PRODUCER.call()
      const result1 = await projectOneInstance.hasRole(pOneExecRole, user1)
      const result2 = await projectOneInstance.hasRole(pOneExecRole, user2)
      const result3 = await projectTwoInstance.hasRole(pTwoExecRole, user2)
      const result4 = await projectTwoInstance.hasRole(pTwoExecRole, user1)
      // const projectTwoInstance = await Project.at(projects[1])

      // await projectOneInstance.
      console.log(projects)
      console.log(result1, result2)
      console.log(result3, result4)
    })

  })


})
