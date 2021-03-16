import React from "react"
import { Link } from "gatsby"

const Nav = () => {

  return (
    <ul>
      <li>
        <Link to="/about">
          About
        </Link>
      </li>
      <li>
        <Link to="/faq">
          FAQ
        </Link>
      </li>
    </ul>
  )
}

export default Nav
