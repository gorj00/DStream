const { assert } = require("chai")

const User = artifacts.require("User")
const abi = require('../abis/User.json').abi;

contract('User registers, logs in, and logs out', ([user1, user2, user3]) => {
  it('registers a user', async () => {
    // // await UserContract.
    const UserContract = await User.deployed()
    // // console.log(UserContract)
    // const acco
    const registrationResult = await UserContract.register(user3)/* .send({ from: user2 }) */
    const login = await UserContract.users(user3)/* .send({ from: user2 }) */
    // const users = UserContract.users(user1)
    // console.log(registrationResult.logs[0], registrationResult.logs[0].args)
    // const contract = await new web3.eth.Contract(abi, '0xB70ebddCdDdf757E4AEB81E1c09500450FDC9B6c')
    // const result = await contract.methods.register(user1).send({ from: user1 })
    // console.log(result)
    // console.log(users)
    // console.log(user1)

    // assert.isTrue(registrationResult)
    const log = registrationResult.logs[0]
    console.log(login)
    assert.equal(log.event, 'UserRegistered')
  })
})
