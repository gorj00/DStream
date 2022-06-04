const { assert } = require("chai")

const User = artifacts.require("User")

contract('User registers, logs in, and logs out', ([user1, user2]) => {
  it('registers a user', async () => {
    // await UserContract.
    const UserContract = await User.deployed()
    // console.log(UserContract)
    const registrationResult = await UserContract.register(user1, { from: user1 })
    console.log(registrationResult)
    // assert.isTrue(registrationResult)
    // const log = registrationResult.logs[0]
    // assert.equal(log.event, 'UserRegistered')
  })
})
