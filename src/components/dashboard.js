import React from "react"
import detectEthereumProvider from '@metamask/detect-provider';
const Web3 = require('web3');

const NFT_CONTRACT_ADDRESS = "0x72138Afd66d83AD098fA2dA0A0333847d15caA74";
const NFT_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "numChubbies",
        "type": "uint256"
      }
    ],
    "name": "adoptChubby",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "calculatePrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
    {
      "internalType": "address",
      "name": "_owner",
      "type": "address"
    }
    ],
    "name": "tokensOfOwner",
    "outputs": [
    {
      "internalType": "uint256[]",
      "name": "",
      "type": "uint256[]"
    }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
  },
];


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentAccount: null,
      statusString: "Please connect your Metamask wallet",
      totalSupply: "",
      isSendingTransaction: false
    }
  }

  async componentDidMount() {
    console.log("componentDidMount");
    if (this.ethereum) {
      return;
    }
    this.ethereum = await detectEthereumProvider();
    if (this.ethereum === null || this.ethereum !== window.ethereum ) {
      console.log("ethereum provider not detected");
      this.updateState(null);
      return;
    }

    this.web3 = new Web3(this.ethereum);

    if (this.web3 === null) {
      console.log('web 3 not found');
      return;
    }
    console.log('before contract');
    this.nftContract = new this.web3.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );
    console.log("ethereum provider detected");
    this.updateTotalSupply();

    /**********************************************************/
    /* Handle chain (network) and chainChanged (per EIP-1193) */
    /**********************************************************/
    const chainId = await this.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== "0x1") {
      console.log("chain id = " + chainId);
      alert("Not mainnet");
    }

    this.ethereum.on('chainChanged', handleChainChanged);

    function handleChainChanged(_chainId) {
      // We recommend reloading the page, unless you must do otherwise
      window.location.reload();
    }

    /***********************************************************/
    /* Handle user accounts and accountsChanged (per EIP-1193) */
    /***********************************************************/
    this.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts) => this.handleAccountsChanged(accounts))
      .catch((err) => {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts will return an empty array.
        console.error(err);
      });

    // Note that this event is emitted on page load.
    // If the array of accounts is non-empty, you're already
    // connected.
    this.ethereum.on('accountsChanged', () => this.handleAccountsChanged);

    // For now, 'eth_accounts' will continue to always return an array
    
  }

  handleAccountsChanged = (accounts) => {
    console.log("accounts");
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
      this.updateState(null);
    } else if (accounts[0] !== this.state.currentAccount) {
      console.log("gotAccount");
      this.updateState(accounts[0]);
    }
  }

  connect = () => {
    console.log(this.ethereum);
    if (this.ethereum === null) {
      alert("no wallet");
      return;
    }
    if (this.state.currentAccount) {
      console.log("account already connected");
      return;
    }
    this.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then((accounts) => this.handleAccountsChanged(accounts))
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
  }

  updateState = (accountAddress) => {
    if (accountAddress) {
      this.setState({ 
        currentAccount: accountAddress, 
        statusString: "connected to " + accountAddress,
        totalSupply: this.state.totalSupply,
        isSendingTransaction: this.state.isSendingTransaction
      });
    } else {
      this.setState({
        currentAccount: accountAddress, 
        statusString: "Wallet not connected. Please connect to wallet!",
        totalSupply: this.state.totalSupply,
        isSendingTransaction: this.state.isSendingTransaction
      });
    }
  }

  adoptChubby = (contractAddress, contractABI) => {
    console.log("ccc");
    console.log('Start mint.js');
    const account = this.state.currentAccount;

    if (account === null) {
      console.log('no account detected');
      return;
    }

    this.setState({
      currentAccount: this.state.currentAccount, 
      statusString: this.state.statusString,
      totalSupply: this.state.totalSupply,
      isSendingTransaction: true
    });
    
    this.nftContract.methods.calculatePrice().call().then((unitPrice) => {
      const encodedAdoptFunction = this.nftContract.methods.adoptChubby(1).encodeABI();

      const transactionOptions = {
        from: account,
        to: contractAddress,
        data: encodedAdoptFunction,
        value: unitPrice,
      };
      this.web3.eth.sendTransaction(transactionOptions, (err, transactionId) => {
        if  (err) {
          console.log('Payment failed', err)
        } else {
          console.log('Payment successful', transactionId)
        }
        this.setState({
          currentAccount: this.state.currentAccount, 
          statusString: this.state.statusString,
          totalSupply: this.state.totalSupply,
          isSendingTransaction: false
        });
      });
    });
  }

  updateTotalSupply = () => {
    this.nftContract.methods.totalSupply().call().then((totalSupply) => {
      this.setState({
        currentAccount: this.state.currentAccount, 
        statusString: this.state.statusString,
        totalSupply: totalSupply
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <p>{this.state.statusString}</p>
        <p>Total Supply: {this.state.totalSupply}/10000</p>
        <button 
          onClick={() => this.adoptChubby(NFT_CONTRACT_ADDRESS, NFT_ABI)}
          disabled={this.state.currentAccount == null || this.state.isSendingTransaction}
        >
          Click me
        </button>
      </div>
    );
  }
}

export default Dashboard
