/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"

import sampleGIF1 from '../gifs/1.gif'
import sampleGIF2 from '../gifs/2.gif'
import sampleGIF3 from '../gifs/3.gif'

const Bio = ({releasedNumber}) => {
  return (
    <div className="blog-post">
      <div>
        <h3>What are Chubbies?</h3>
        <p>
          Chubbies are the cutest generated NFTs on the Ethereum blockchain! They can be chubby, but they are cute AF too! 
        </p>
        <p>
          Paying respect to its predecessors (Cryptopunks), of course there will be <span style={{color: "darkolivegreen"}}>Zombies</span>, <span style={{color: "maroon"}}>Apes</span>, <span style={{color: "turquoise"}}>Aliens</span> but we didn't stop there. We have <span style={{color: "dimgray"}}>Robots</span>, <span style={{color: "midnightblue"}}>Cats</span> and <span style={{color: "sienna"}}>Monkey</span>! There's a variety of combinations of accessories and backgrounds that will appeal to everyone.  
        </p>

        <h3>Specs</h3>
        <p>
          Each Chubby is a programmatically generated 32x32 GIF enlarged to 320x320, stored as a ERC721 token on the Ethereum blockchain. Every one of them is unique, carefully crafted from more than 32 variables, and animated with 5 different frames at 400ms per frame. There will be a limited supply at 10000 and the pricing follows a bonding curve detailed below. 
        </p>

        <div className="sample-gallery">
          <img src={sampleGIF1} alt="Sample Chubby 1" />
          <img src={sampleGIF2} alt="Sample Chubby 2" />
          <img src={sampleGIF3} alt="Sample Chubby 3" />
        </div>

        <h3>A Cute and Chubby Bonding Curve</h3>
        <p>
          The purchase price increases with a bonding curve to <del>create FOMO</del>reward early supporters so that more people will buy these cute little things. To <del>punish our greediness</del>build a community and encourage trading, we purposefully designed the curve to be competitive as compared to other projects. 75% of them are priced under 0.2 ETH and the highest price is capped at 1 ETH. 
        </p>
        <ul>
          <li>0 - 499: 0.02 ETH</li>
          <li>500 - 1499: 0.04 ETH</li>
          <li>1500 - 3499: 0.08 ETH</li>
          <li>3500 - 7499: 0.16 ETH</li>
          <li>7500 - 9499: 0.32 ETH</li>
          <li>9500 - 9899: 0.64 ETH</li>
          <li>9900 - 9999: 1.00 ETH</li>
        </ul>

        <h3>Why get a NFT? Why get a Chubby?</h3>
        <p>Think of it as Trading Card Games for adults with some money to spare. NFT is at its peak currently and you should join the hype! Even though it's a little too hyped right now imo, the technology changes how people collect and trade art fundamentally and we strongly believe that it's here to stay. For example, everyone can peek into each others' collection a.k.a wallets. Trading art has never been so easy before. Art is like the new stocks. Who knows? A NFT you buy now might be worth millions in the future<del> (or zero).</del></p>
        <p>As for why Chubbies, well maybe you want it because you're chubby. Or skinny. Or maybe you're an Ape, a Zombie, or an Alien. Or you want one for your Cat. This can't got wrong because art is in the eyes of the beholder and there's no failure in art. And most of all, like the Japanese says it, Cuteness is Justice! Get a Chubby while its still cheap cheap!</p>
        <p>
          We can't wait to see what the community think of which one is the cutest! 
        </p>
      </div>
    </div>
  )
}

export default Bio
