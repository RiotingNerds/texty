import React from 'react'
import Header from './Header'
import Nav from './Nav'

const Main = () => {
  return (<section id="contentWrapper">
      <Header />
      <Nav />
      <section id="bodyWrapper">
        {this.props.children}
      </section>
    </section>
  )
}

export default Main