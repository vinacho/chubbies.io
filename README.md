# chubbies.io
This is the code for [chubbies.io](chubbies.io) that was used to sell all 10000 Chubbies NFT in March. 
All Chubbies were sold out but you can still find them selling on [OpenSea](https://opensea.io/collection/chubbies)
It serves as an example for anyone who are interested to mint ERC721 tokens on their own website.

This site interacts with the [Chubbies Contract](https://etherscan.io/address/0x1db61fc42a843bad4d91a2d788789ea4055b8613).
Note: The site was hacked together quickly using React, Gatsby, and web3.js by bwpunks who had close to zero React experience so don't expect too much :P

## How to run locally
- `npm install` to install required packages
- `yarn develop` to set up the local server
- Access `http://localhost:8000/` in local browser

## What can I do with this code?
You can do whatever you want with it. Use it as a reference/inspiration/base and start your own website to mint your NFTs and have fun.

## How about the contract code or NFT generation code?
You can find the contract code [here](https://etherscan.io/address/0x1db61fc42a843bad4d91a2d788789ea4055b8613#code) and the NFT generation code [here](https://gist.github.com/bwpunks/3a69e32c58c3e9bb3f4359bc1daa45ba).

## I want to create NFTs but this is too complicated
Here are some helpful tutorials that helped me:
- [Ethereum Dapp React Tutorial](https://www.dappuniversity.com/articles/ethereum-dapp-react-tutorial)
- [OpenSea Sample Project](https://github.com/ProjectOpenSea/opensea-creatures)
- [Ethereum Test Network](https://medium.com/compound-finance/the-beginners-guide-to-using-an-ethereum-test-network-95bbbc85fc1d)

Or you can just use [OpenSea Collection Manager](https://opensea.io/blog/announcements/introducing-the-collection-manager/) to mint collections easily without any programming knowledge. The caveat is that it can only be done manually so it will be very troublesome to create a large collection (e.g. 10000) with it. 

## chubbies.io V2
The above code has served its purpose but is not very scalable. For example, its not mobile friendly and doesn't serve key features like exploring all Chubbies. It doesn't have a backend etc. A stronger chubbies.io V2 is currently under development and will also be open sourced once the base code and design are ready. Stay tuned!

## I want to support or contribute
In the meantime, you can support by getting a Chubbie from [OpenSea](https://opensea.io/collection/chubbies) or just share love.
