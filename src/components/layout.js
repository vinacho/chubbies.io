import React from "react"
import { Link } from "gatsby"

import Nav from "../components/nav"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <div className="bwpunk-art--1-large" />
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <div className="header-wrapper">
        <header className="global-header">{header}</header>
      </div>
      <Nav />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, bwpunks.com
      </footer>
    </div>
  )
}

export default Layout
