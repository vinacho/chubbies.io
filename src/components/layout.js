import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ location, title, children }) => {
   const data = useStaticQuery(graphql`
    query LayoutQuery {
      profile: file(absolutePath: { regex: "/favicon.png/" }) {
        childImageSharp {
          fixed(width: 100, height: 100, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const profile = data?.profile?.childImageSharp?.fixed

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const header = (
    <h1 className="main-heading">
      <Image
        fixed={profile}
        alt={``}
        className="bio-avatar"
      />
      <Link to="/">{title.toUpperCase()}</Link>
    </h1>
  )

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <div className="header-wrapper">
        <header className="global-header">{header}</header>
      </div>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, chubbies.io
      </footer>
    </div>
  )
}

export default Layout
