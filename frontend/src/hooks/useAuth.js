import Web3 from 'web3'
import Web3Modal from 'web3modal'
import HDWalletProvider from '@truffle/hdwallet-provider'
import DStreamToken from '@dstream/ethereum/abis/DStreamToken.json'

export function useAuth () {

    const TOKEN_KEY = 'eth-auth'
    const providerOptions = {   
        // network: "goerli", // optional
 };
    const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
    });
    let provider = null;



    const login = async () => {
        if (window.ethereum) {
          provider = await web3Modal.connect();
          const web3 = new Web3(provider);
          const accounts = await web3.eth.getAccounts();
          console.log(accounts)
          localStorage.setItem(TOKEN_KEY, accounts[0]);


          const networkId = await web3.eth.net.getId()
          const networkData = DStreamToken.networks[networkId]
            if(networkData) {
              const contract = new web3.eth.Contract(DStreamToken.abi, networkData.address)
              console.log('hello')
              const memeHash = await contract.methods.sendAwards('0xf1C118004297Cd03996aE312A7F88a5f8e3d65f9', accounts[0], 1).send({from: accounts[0]});
              const bal = await contract.methods.balanceOf(accounts[0]).call();
              console.log(memeHash, bal)

            }

          return Promise.resolve();
        } else {
          return Promise.reject(
            new Error(
              "Not set ethereum wallet or invalid. You need to install Metamask"
            )
          );
        }
    }

    const logout = async () => {
        localStorage.removeItem(TOKEN_KEY);
        if (provider && provider.close) {
          await provider.close;
    
          provider = null;
          await web3Modal.clearCachedProvider();
        }
        return Promise.resolve();
      }


    return {
        TOKEN_KEY, login, logout,
    }


}
