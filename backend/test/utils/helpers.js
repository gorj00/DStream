const ether = (n) => {
    // Not really using ether, only using for converting decimal places which is the same for a custom Token of 18 decimals
    return new web3.utils.BN( // Big number
        web3.utils.toWei(n.toString(), 'ether')
    )
}

const tokens = (n) => ether(n)

const EVM_REVERT = 'VM Exception while processing transaction: revert'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

module.exports = {
    ether, tokens, EVM_REVERT, ZERO_ADDRESS, ETHER_ADDRESS,
}
