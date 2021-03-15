/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"

const Bio = ({releasedNumber}) => {
  return (
    <div className="blog-post">
      <div>
        <p>
          Minimalist punks with only two colors - black and white.
        </p>
        <p>
          Rumor has it that there's a certain tribe of punks who like living a simple life and watching Akira Kurosawa movies.
        </p>
        <p>
          This project pays homage to the OG cryptopunks project and is not affiliated with Larva Labs.
        </p>
        <p>
          Site under construction.
        </p>
        <p>
          Check twitter <a href="https://twitter.com/bwpunks">(@bwpunks)</a> for latest info!
        </p>
        <p>
          {releasedNumber} out of 1000 NFTs have been minted and you can trade on <a href="https://opensea.io/collection/bwpunks">OpenSea</a>.
        </p>
      </div>
    </div>
  )
}

export default Bio
