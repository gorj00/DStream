const { assert } = require("chai")

const User = artifacts.require("User")
const abi = require('../abis/User.json').abi;

contract('User registers, logs in, and logs out', ([user1, user2, user3]) => {
  let UserContract
  before(async () => {
    UserContract = await User.at('0xCfEB869F69431e42cdB54A4F4f105C19C080A601')
    console.log('address xx ', UserContract.address)
  })
  it('registers a user', async () => {
    // // await UserContract.
    // // console.log(UserContract)
    // const acco
    const registrationResult = await UserContract.register(user3, { from: user3 })/* .send({ from: user2 }) */
    const login = await UserContract.users(user1)/* .send({ from: user2 }) */
    // const users = UserContract.users(user1)
    // console.log(registrationResult.logs[0], registrationResult.logs[0].args)
    // const contract = await new web3.eth.Contract(abi, '0xB70ebddCdDdf757E4AEB81E1c09500450FDC9B6c')
    // const result = await contract.methods.register(user1).send({ from: user1 })
    // console.log(result)
    // console.log(users)
    // console.log(users)

    // assert.isTrue(registrationResult)
    const log = registrationResult.logs[0]
    assert.equal(log.event, 'UserRegistered')
  })
  it('logins a user', async () => {
    // // await UserContract.
    // // console.log(UserContract)
    // const acco
    const user = await UserContract.users(user3)
    console.log(user3)
    const login = await UserContract.login(user3, { from: user3 })/* .send({ from: user2 }) */
    // const users = UserContract.users(user1)
    // console.log(registrationResult.logs[0], registrationResult.logs[0].args)
    // const contract = await new web3.eth.Contract(abi, '0xB70ebddCdDdf757E4AEB81E1c09500450FDC9B6c')
    // const result = await contract.methods.register(user1).send({ from: user1 })
    // console.log(result)
    // console.log(users)
    // console.log(users)

    // assert.isTrue(registrationResult)
    const log = login.logs[0]
    console.log(login)
    assert.equal(log.event, 'UserLoginLog')
  })
})
