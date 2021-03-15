const Web3 = require('web3');

const adoptChubby = async (contractAddress, contractABI) => {
  console.log('Start mint.js');

  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

  console.log('before contract');
  const nftContract = new web3.eth.Contract(
    contractABI,
    contractAddress,
    { gasLimit: "1000000" }
  );
  const unitPrice = await nftContract.methods.calculatePrice().call();
  const encodedAdoptFunction = nftContract.methods.adoptChubby(1).encodeABI();

  const transactionOptions = {
    from: accounts[0],
    to: contractAddress,
    data: encodedAdoptFunction,
    value: unitPrice,
  };
  web3.eth.sendTransaction(transactionOptions, (err, transactionId) => {
    if  (err) {
      console.log('Payment failed', err)
    } else {
      console.log('Payment successful', transactionId)
    }
  })
}

export default adoptChubby
