import React from "react"
import detectEthereumProvider from '@metamask/detect-provider';
import upsellGIF from '../gifs/1.gif'
const Web3 = require('web3');

// TEST
// const OPENSEA_WEB = "https://testnets.opensea.io/assets/0xe979ee4f9f11b321eadf91853dc86beb05b8a029/";
// const NFT_CONTRACT_ADDRESS = "0xE979eE4F9f11b321eaDF91853DC86BeB05B8a029"; //test

// MAINNET
const OPENSEA_WEB = "https://opensea.io/assets/0xe979ee4f9f11b321eadf91853dc86beb05b8a029/";
const NFT_CONTRACT_ADDRESS = "0x1DB61FC42a843baD4D91A2D788789ea4055B8613";
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
    "inputs": [],
    "name": "hasSaleStarted",
    "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
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
  }
];


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentAccount: null,
      totalSupply: 0,
      isSendingTransaction: false,
      purchaseNumber: "1",
      hasSaleStarted: false,
      isMainnet: true,
      unitPrice: 0,
      ownedChubbies: [],
      statusString: null
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
      this.setState({ 
        currentAccount: null, 
      });
      return;
    }

    this.web3 = new Web3(this.ethereum);

    if (this.web3 === null) {
      console.log('web 3 not found');
      return;
    }
    this.nftContract = new this.web3.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );

    this.connect()

    /**********************************************************/
    /* Handle chain (network) and chainChanged (per EIP-1193) */
    /**********************************************************/
    const chainId = await this.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== "0x1") {
      this.setState({isMainnet: false})
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
    this.updateInitialStates();
  }

  handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      this.setState({ 
        currentAccount: null, 
      });
    } else if (accounts[0] !== this.state.currentAccount) {
      this.setState({ 
        currentAccount: accounts[0], 
      });
    }
    this.updateOwnedChubbies();
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

  adoptChubby = (contractAddress, contractABI, numPurchase) => {
    const account = this.state.currentAccount;

    if (account === null) {
      console.log('no account detected');
      return;
    }

    this.setState({
      isSendingTransaction: true,
    });
    
    this.nftContract.methods.calculatePrice().call().then((unitPrice) => {
      const encodedAdoptFunction = this.nftContract.methods.adoptChubby(numPurchase).encodeABI();

      const transactionOptions = {
        from: account,
        to: contractAddress,
        data: encodedAdoptFunction,
        value: unitPrice*numPurchase,
      };
      this.web3.eth.sendTransaction(transactionOptions, (err, transactionId) => {
        if  (err) {
          console.log('Payment failed', err)
          this.setState({
            isSendingTransaction: false,
            statusString: "Payment failed!"
          });
        } else {
          console.log('Payment successful', transactionId)
          this.setState({
            isSendingTransaction: false,
            statusString: "Payment successful! Please check Metamask for details and refresh when its done."
          });
        }
      });
    });
  }

  updateInitialStates = () => {
    this.updateTotalSupply();
    this.updateHasSaleStarted();
    this.updateUnitPrice();
    this.updateOwnedChubbies();
  }

  updateTotalSupply = () => {
    console.log("called totalSupply");
    this.nftContract.methods.totalSupply().call().then((totalSupply) => {
      this.setState({
        totalSupply: totalSupply,
      });
    });
  }

  updateHasSaleStarted = () => {
    this.nftContract.methods.hasSaleStarted().call().then((hasSaleStarted) => {
      this.setState({
        hasSaleStarted: hasSaleStarted
      });
    });
  }

  updateUnitPrice = () => {
    this.nftContract.methods.calculatePrice().call().then((unitPrice) => {
      this.setState({
        unitPrice: this.web3.utils.fromWei(unitPrice, "ether")
      });
    });
  }

  updateOwnedChubbies = () => {
    if (this.state.currentAccount) {
      this.nftContract.methods.tokensOfOwner(this.state.currentAccount).call().then((ownedChubbies) => {
        this.setState({
          ownedChubbies: ownedChubbies
        });
      });
    }
  }

  render() {
    return (
        <div className="sticky-cta">
          {this.state.hasSaleStarted ? (
            <div>
              <div className="sticky-container">
                <div className="sticky-gif-container">
                  <img src={upsellGIF} alt="Sample Chubby 1" />
                </div>
                <div className="sitcky-content-container">
                  <div><strong>Join the Chubby Presale</strong></div>
                  <p>Current Wallet: {this.state.currentAccount || "Please connect to a Metamask Wallet"}</p>
                  <p>Number of Chubbies Adopted: {this.state.totalSupply}/10000</p>
                  <p>Your Chubbies: 
                  {this.state.ownedChubbies.map( element => {
                    const link = OPENSEA_WEB + element;
                    return (<span key={element}><a href={link} target="_blank">{element}</a> </span>)
                  })}
                  </p>
                  <p>{this.state.unitPrice <= 0 ? "" : "Price: "+ (this.state.unitPrice * parseInt(this.state.purchaseNumber)) + " ETH + gas"}</p>
                  {this.state.statusString && <p>{this.state.statusString}</p>}
                </div>
              </div>
              <div className="sticky-button-container">
                <span>Adopt <input 
                  type="number"
                  value={this.state.purchaseNumber} 
                  onChange={event => this.setState({purchaseNumber: event.target.value.replace(/\D/,'')})}
                  min="1"
                  max="20"
                  style={{width: "50px"}}/> Chubbies</span>
                <button
                    className="cta-button" 
                    onClick={() => this.adoptChubby(NFT_CONTRACT_ADDRESS, NFT_ABI, parseInt(this.state.purchaseNumber))}
                    disabled={this.state.currentAccount == null || this.state.isSendingTransaction || !this.state.hasSaleStarted}
                  >
                  Request on Metamask
                </button>
              </div>
            </div>
          ) : 
            <div className="sticky-container">
              <div><strong>Sale has not started yet. Follow <a href="https://twitter.com/chubbiesnft">Twitter</a> for latest info.</strong></div>
            </div>
          }
          
        </div>
      
    );
  }
}

export default Dashboard
