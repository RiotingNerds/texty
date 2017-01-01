import React from 'react';
import Header from './Header';
import SideBarContainer from './SideBar';
import Footer from '../footer/Footer';

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <section>
        <div className="site-content">
          <Header />
            <section id="bodyWrapper">
              <div className="page-container">
                {this.props.children}
              </div>
            </section>
            <Footer />
        </div>
      </section>
    )
  }
}


export default App