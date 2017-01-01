import searchAction from '../actions/SearchAction'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import React from 'react'
import HomeSearch from './HomeSearch'
import Steps from './Steps'
import Helmet from "react-helmet";


const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (text) => {
      dispatch(searchAction.Search(text))
    }
  }
}

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="homeWrapper" className="row">
        <Helmet
          title="Find the cheapest beauty products that ships to Singapore"
          meta={[
              {"name": "description", "content": "Compare beauty product prices for the best beauty deals at cheap prices. It's free, fast and easy! Save time and money as we compare more than 10 trustworthy websites."},
              {"property": "og:title", "content": "Find the cheapest beauty products that ships to Singapore"},
              {"property": "og:description", "content": "Compare beauty product prices for the best beauty deals at cheap prices. It's free, fast and easy! Save time and money as we compare more than 10 trustworthy websites."},
              {"property": "og:url", "content": "http://shop.dailyvanity.sg"},
              {"property": "og:type", "content": "website"},
              {"property": "og:image", "content": "http://images.dailyvanity.sg/wp-content/uploads/2015/07/dv-logo-square.png"}
          ]}
        />
        <HomeSearch />
        <Steps />
      </div>
    )
  }
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)

export default Home
