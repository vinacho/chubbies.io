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
          Chubbies are the cutest generated NFTs on the Ethereum blockchain! They can be chubby, but they are cute AF too! 
        </p>

        <div>
          <img style={{width: "100%"}}src={bannerGIF} alt="Banner" />
        </div>

        <p>
          Paying respect to its predecessors (Cryptopunks), of course there will be <span className="zombie race">Zombies</span>, <span className="ape race">Apes</span>, <span className="alien race">Aliens</span> but we didn't stop there. We have <span className="robot race">Robots</span>, <span className="cat race">Cats</span> and <span className="monkey race">Monkey</span>! There's a variety of combinations of animal customes, accessories like <span className="diamond-hands race">Diamond Hands</span> and backgrounds like <span className="rainbow race">Rainbow</span> that will spice up your Chubby and give it its unique look.  
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
          The purchase price increases with a bonding curve to <del>create hype and FOMO</del> reward early supporters so that more people will buy these cute little things. To <del>punish our greediness</del> build a community and encourage collecting and trading, we purposefully designed the curve to be competitive as compared to other projects. As a result, 75% of them are priced under 0.2 ETH and the highest price is capped at 1 ETH. 
        </p>
        <ul>
          <li>#0 - #499: 0.02 ETH</li>
          <li>#500 - #1499: 0.04 ETH</li>
          <li>#1500 - #3499: 0.08 ETH</li>
          <li>#3500 - #7499: 0.16 ETH</li>
          <li>#7500 - #9499: 0.32 ETH</li>
          <li>#9500 - #9899: 0.64 ETH</li>
          <li>#9900 - #9999: 1.00 ETH</li>
        </ul>

        <h3>Why get a NFT? Why get a Chubby?</h3>
        <p>Think of NFT as Trading Card Games for adults with some money to spare. NFT is at its peak currently and you should join the hype! Even though it's a little too hyped right now imo, the technology changes how people collect and trade art fundamentally and we strongly believe that it's here to stay. For example, everyone can peek into each others' collection a.k.a wallets. Trading art has never been so easy before. Art is like the new stocks. Who knows? A NFT you buy now might be worth millions in the future<del> (or zero).</del></p>
        <p>As for why Chubbies, there can be so many reasons! Well, maybe you want a chubby because you're chubby. Or skinny. Or maybe you're an <span className="ape race">Ape</span>, a <span className="robot race">Robots</span>, a <span className="zombie race">Zombie</span>, or an <span className="alien race">Alien</span> and want a NFT waifu. Or NFT husbando. Or you want one for your <span className="cat race">Cat</span>. </p>

        <p>Chubbies are so cute that they can't go wrong. <strong>Because art is in the eyes of the beholder and there's no failure in art.</strong> And most of all, like the Japanese says it, Cuteness is Justice(<em>かわいいは正義</em>)! Get a Chubby while its still early and cheap cheap!</p>
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
        <p>We are a husband-wife duo who believe in the future of crypto and NFTs. We make NFTs while we HODL onto BTC, ETH, and ADA. Both of us loave pixel art and we both design and code. Check out our other project - @bwpunks!</p>
      </div>
    </div>
  )
}

export default Bio
