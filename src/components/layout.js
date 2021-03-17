import React from "react"
import { Link } from "gatsby"

import Nav from "../components/nav"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const header = (
    <h1 className="main-heading">
      <div className="bwpunk-art--1-large" />
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
