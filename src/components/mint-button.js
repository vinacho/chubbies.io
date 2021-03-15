import React from "react"
import adoptChubby from "../scripts/mint.js"
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
  }
];

class MintButton extends React.Component {
  async handleClick() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    await adoptChubby(NFT_CONTRACT_ADDRESS, NFT_ABI, accounts[0])
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}

export default MintButton
