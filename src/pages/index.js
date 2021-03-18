import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Dashboard from "../components/dashboard"

const BlogIndex = ({ data, location }) => {
  const siteTitle = "Chubbies"

  return (
    <Layout location={location} title={siteTitle}>
      <SEO />
      <Bio/>
      <Dashboard />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
