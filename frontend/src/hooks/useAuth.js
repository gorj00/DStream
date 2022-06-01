import Web3 from 'web3'
import Web3Modal from 'web3modal'

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
          localStorage.setItem(TOKEN_KEY, accounts[0]);
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