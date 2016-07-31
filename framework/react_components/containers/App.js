import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import SideBar from './SideBar'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<section id="contentWrapper">
        <Header />
        <Nav />
        <section id="bodyWrapper">
          <div className="container">
            {this.props.children}
          </div>
        </section>
      </section>
    )
  }
}


export default App