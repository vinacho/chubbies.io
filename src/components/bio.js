/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

import sampleGIF1 from '../gifs/1.gif'
import sampleGIF2 from '../gifs/2.gif'
import sampleGIF3 from '../gifs/3.gif'
import sampleGIF4 from '../gifs/4.gif'
import sampleGIF5 from '../gifs/5.gif'
import sampleGIF6 from '../gifs/6.gif'
import sampleGIF7 from '../gifs/7.gif'
import sampleGIF8 from '../gifs/8.gif'
import sampleGIF9 from '../gifs/9.gif'
import bannerGIF from '../gifs/launch-banner.gif'

const Bio = ({releasedNumber}) => {

  const data = useStaticQuery(graphql`
    query BioQuery {
      husband: file(absolutePath: { regex: "/69.png/" }) {
        childImageSharp {
          fixed(width: 100, height: 100, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      wife: file(absolutePath: { regex: "/115.png/" }) {
        childImageSharp {
          fixed(width: 100, height: 100, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)
  const wifeAvatar = data?.wife?.childImageSharp?.fixed
  const husbandAvatar = data?.husband?.childImageSharp?.fixed

  return (
    <div className="blog-post">
      <div>
        <h3>What are Chubbies?</h3>
        <p>
          Chubbies are the cutest generated NFTs on the Ethereum blockchain! They can be chubby, but they are cute AF <span role="img">😘</span> too!
        </p>

        <div>
          <img style={{width: "100%"}}src={bannerGIF} alt="Banner" />
        </div>

        <p>
          Paying respect to its predecessors like CryptoPunks, of course, there will be <span className="zombie race">Zombies</span>, <span className="ape race">Apes</span>, <span className="alien race">Aliens</span> but wait! We didn't stop there. We have <span className="robot race">Robots</span>, <span className="cat race">Cats</span> and <span className="monkey race">Monkeys</span>! There are nearly endless combinations -- Animal costumes, Facial expressions, Accessories like <span className="diamond-hands race">Diamond Hands</span> and Backgrounds like <span className="rainbow race">Rainbows</span> -- to spice up your Chubby for its own unique look.
        </p>

        <h3>Specs</h3>
        <p>
          Each Chubby is a programmatically generated 32x32 GIF enlarged to 320x320, stored as an ERC721 token on the Ethereum blockchain. Each one is unique, carefully crafted from than 6 properties, and animated with 5 different frames at 150ms per frame. There will be a limited supply of 10000, and the pricing follows a bonding curve detailed below.
        </p>

        <div className="sample-gallery">
          <img src={sampleGIF1} alt="Sample Chubby 1" />
          <img src={sampleGIF2} alt="Sample Chubby 2" />
          <img src={sampleGIF3} alt="Sample Chubby 3" />
        </div>

        <h3>A Cute and Chubby Bonding Curve</h3>
        <p>
          The purchase price increases with a bonding curve to <del>create hype and FOMO</del> reward early supporters so that more people will buy these cute little things. To build a community and encourage collecting and trading, we purposefully designed the curve to be competitive compared to other projects. By design, 75% of them are priced under 0.2 ETH, and the highest price is capped at 1 ETH.
        </p>
        <ul>
          <li>#0 - #29: Reserved for Giveaways and people who helped along the way</li>
          <li>#30 - #499: 0.02 ETH</li>
          <li>#500 - #1499: 0.04 ETH</li>
          <li>#1500 - #3499: 0.08 ETH</li>
          <li>#3500 - #7499: 0.16 ETH</li>
          <li>#7500 - #9499: 0.32 ETH</li>
          <li>#9500 - #9899: 0.64 ETH</li>
          <li>#9900 - #9999: 1.00 ETH</li>
        </ul>

        <h3 id="why">Why get a NFT? Why get a Chubby?</h3>
        <p>Think of NFT as Trading Card Games for adults who love collecting and with some money to spare. NFT is trending. Now is the time to join the party! NFT fundamentally changes how people can collect and trade art. We strongly believe that it's here to stay. For example, through common standards, everyone can easily peek into each others' collection a.k.a wallets. It’s like art collecting on steroids. Trading art has never been so easy, and Art is like the new stocks. Who knows? The NFTs you buy today might be worth millions in the future <del>(or zero)</del>. Nevertheless, your NFT experience will be priceless. </p>
        <p>As for why Chubbies? So many reasons! Well, maybe you want a Chubby NFT because you're chubby. Or skinny. Or maybe you're an <span className="ape race">Ape</span>, a <span className="robot race">Robots</span>, a <span className="zombie race">Zombie</span>, or an <span className="alien race">Alien</span> and want an NFT waifu. Or an NFT husbando. Or you want one for your <span className="cat race">Cat</span>.</p>

        <p><strong>Most of all, Chubbies are so cute that you can't go wrong. Because there's no failure in art. Art is in the eyes of the beholder, and you know for a fact that they’re cute.</strong> Like the the legendary Japanese samurai Musashi once said, Cuteness is Justice(<em>かわいいは正義</em>)! Get a Chubby while its still early and cheap cheap!</p>
        <p>
          There are so many possible combinations and we can't wait to see what the community think of which one is the cutest! 
        </p>

        <h3>About Us</h3>
        {husbandAvatar && (
          <div>
            <Image
              fixed={husbandAvatar}
              alt={``}
              className="bio-avatar"
            />
            <Image
              fixed={wifeAvatar}
              alt={``}
              className="bio-avatar"
            />
          </div>
        )}
        <p>We are a husband-wife duo who believes in the future of crypto and NFTs. We make NFTs while we HODL onto BTC, ETH, and ADA. Both of us love pixel art, and we both design and code. Check out our other project on Twitter - @bwpunks!</p>

        <h3 id="faq">FAQ</h3>
        <h4>Buying NFT for the first time, how can I get started? </h4>
        <p>Get a <a href="https://metamask.io/">Metamask</a> chrome extension. Load it with ETH through services that allow you to change your money to ETH like <a href="https://pro.coinbase.com/">Coinbase Pro</a> or <a href="https://www.paypal.com/">Paypal</a>. Finally, click the button on the Sticky banner and approve the transaction on Metamask. Voila! </p>

        <h4>Are Chubbies a good investment?</h4> 
        <p>Well, first of all, Chubbies are not Mona Lisas so... it depends. Use your own judgment. Chubbies do have a bonding curve but please don’t spend your food money on this. Not financial advice. Check out above for <a href="#why">Top 10 Reasons Why Getting a Chubby is the Best Decision You can Make in Your Life RIGHT NOW</a>!</p>

        <h4>How can I trade my Chubbies?</h4> 
        <p>Chubbies adhere to the ERC-721 standard so you can trade them on platforms like <a href="https://opensea.io">OpenSea</a>.</p>

        <h4>What can I do with my Chubbies?</h4> 
        <p>You own your Chubbies digitally and are free to do anything with them. </p>

        <h4>Feedback and purchase issues</h4> 
        <p>The price of the Chubbies transaction is recorded at Metamask launch, so if the total number of Chubbies supply changes during this time, leading to a price change, the transaction will fail due to a price check on the contract. If there are further issues, DM us on Twitter with your Etherscan transaction and we will be sure to take a look!</p>

        <h4>How can I help? </h4> 
        <p>We are still in an early stage and still figuring things out. Really appreciate it if you help share this project!</p>

        <h4>Future Plans</h4> 
        <p>TBD. At this point, Chubbies are just tradable art like all the other NFTs. But we are working on more features for this site and might come up with creative ideas to make it more fun!</p>

        <h4>My Chubbies are not revealed yet on OpenSea, what can I do?</h4> 
        <p>Chubbies are unrevealed during Presale. After the Reveal (which will be announced on Twitter), you can click on "Update Metadata" to see the exact Chubby you got on. Any Chubby gotten after the presale will be revealed by default. </p>
        

        <h3>Cute, Cute, Chubby, Cute</h3>

        <p>Hmmm.. What kind of Chubby will you get?</p>
        <div className="sample-gallery">
          <img src={sampleGIF4} alt="Sample Chubby 4" />
          <img src={sampleGIF5} alt="Sample Chubby 5" />
          <img src={sampleGIF6} alt="Sample Chubby 6" />
          <img src={sampleGIF7} alt="Sample Chubby 7" />
          <img src={sampleGIF8} alt="Sample Chubby 8" />
          <img src={sampleGIF9} alt="Sample Chubby 9" />
        </div>
      </div>
    </div>
  )
}

export default Bio
